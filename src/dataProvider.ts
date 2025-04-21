import {
  fetchUtils,
  DataProvider,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  GetManyParams,
  GetManyReferenceParams,
  RaRecord,
} from "react-admin";

const apiUrl = "http://localhost:4000/api";

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // Don't set Content-Type if FormData is being used (browser will set it with boundary)
  if (options.body && !(options.body instanceof FormData) && !options.headers.has("Content-Type")) {
    options.headers.set("Content-Type", "application/json");
  }

  console.log(`Making ${options.method || "GET"} request to ${url}`);

  return fetchUtils.fetchJson(url, options);
};

const normalizeId = (data: any) => {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      id: item._id || item.id,
    }));
  }

  return {
    ...data,
    id: data._id || data.id,
  };
};

const dataProvider: DataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    const {
      pagination = { page: 1, perPage: 10 },
      sort = { field: "id", order: "ASC" },
      filter = {},
    } = params;

    const { page, perPage } = pagination;
    const { field, order } = sort;

    console.log("DataProvider getList called with:", {
      resource,
      pagination,
      sort,
      filter,
    });

    const queryParams = new URLSearchParams();
    queryParams.set("_sort", String(field));
    queryParams.set("_order", String(order.toLowerCase()));
    queryParams.set("_page", String(page));
    queryParams.set("_limit", String(perPage));

    // Replace the current filter handling in getList
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        ) {
          // Handle nested filter objects
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            queryParams.append(`${key}.${nestedKey}`, String(nestedValue));
          });
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const url = `${apiUrl}/${resource}?${queryParams.toString()}`;
    console.log("Request URL:", url);

    try {
      const { json, headers } = await httpClient(url);
      console.log("Response:", json);

      const responseData = json.data || json;

      if (!Array.isArray(responseData)) {
        console.error(`Expected array but got:`, responseData);
        return { data: [], total: 0 };
      }

      return {
        data: normalizeId(responseData),
        total: parseInt(
          headers?.get("X-Total-Count") ||
            (json.count
              ? json.count.toString()
              : responseData.length.toString()),
          10,
        ),
      };
    } catch (error) {
      console.error("Error in getList:", error);
      return { data: [], total: 0 };
    }
  },

  getOne: async (resource: string, params: GetOneParams) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    const responseData = json.data || json;
    return { data: normalizeId(responseData) };
  },

  getMany: async (resource: string, params: GetManyParams) => {
    try {
      // If there are no IDs, return empty array
      if (!params.ids || params.ids.length === 0) {
        return { data: [] };
      }

      const queryString = params.ids.map((id) => `id=${id}`).join("&");
      const url = `${apiUrl}/${resource}?${queryString}`;

      const { json } = await httpClient(url);

      // Handle the case where the API returns a single object instead of an array
      const responseData = json.data || json;
      const dataArray = Array.isArray(responseData)
        ? responseData
        : [responseData];

      return { data: normalizeId(dataArray) };
    } catch (error) {
      console.error("Error in getMany:", error);
      return { data: [] };
    }
  },

  create: async (resource: string, params: CreateParams) => {
    console.log(`Create ${resource} with data:`, params.data);
    
    // Special handling for car-models with FormData
    if (resource === 'car-models' && params.data instanceof FormData) {
      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: params.data,
      });
      
      console.log(`Create ${resource} response:`, json);
      const responseData = json.data || json;
      return { data: normalizeId(responseData) };
    }
    
    // Regular JSON request for other resources
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });

    const responseData = json.data || json;
    return { data: normalizeId(responseData) };
  },

  update: async (resource: string, params: UpdateParams) => {
    console.log(`Update ${resource} with id ${params.id}, data:`, params.data);
    
    // Special handling for car-models with FormData
    if (resource === 'car-models' && params.data instanceof FormData) {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT", 
        body: params.data,
      });
      
      console.log(`Update ${resource} response:`, json);
      const responseData = json.data || json;
      return { data: normalizeId(responseData) };
    }
    
    // Regular JSON request for other resources
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });

    const responseData = json.data || json;
    return { data: normalizeId(responseData) };
  },

  updateMany: async (resource: string, params) => {
    const updates = params.ids.map((id) =>
      httpClient(`${apiUrl}/${resource}/${id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }),
    );
    await Promise.all(updates);
    return { data: params.ids };
  },

  delete: async <RecordType extends RaRecord>(
    resource: string,
    params: DeleteParams<RecordType>,
  ) => {
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: { ...params.previousData } as RecordType };
  },

  deleteMany: async (resource: string, params) => {
    const deletes = params.ids.map((id) =>
      httpClient(`${apiUrl}/${resource}/${id}`, { method: "DELETE" }),
    );
    await Promise.all(deletes);
    return { data: params.ids };
  },

  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams,
  ) => {
    const {
      target,
      id,
      pagination = { page: 1, perPage: 25 },
      sort = { field: "id", order: "ASC" },
    } = params;
    const { page, perPage } = pagination;
    const { field, order } = sort;

    const queryParams = new URLSearchParams();
    queryParams.set(target, String(id));
    queryParams.set("_sort", String(field));
    queryParams.set("_order", order.toLowerCase());
    queryParams.set("_page", String(page));
    queryParams.set("_limit", String(perPage));

    const url = `${apiUrl}/${resource}?${queryParams.toString()}`;

    try {
      const { json, headers } = await httpClient(url);
      const responseData = json.data || json;

      if (!Array.isArray(responseData)) {
        console.error(`Expected array but got:`, responseData);
        return { data: [], total: 0 };
      }

      return {
        data: normalizeId(responseData),
        total: parseInt(
          headers?.get("X-Total-Count") || responseData.length.toString(),
          10,
        ),
      };
    } catch (error) {
      console.error("Error in getManyReference:", error);
      return { data: [], total: 0 };
    }
  },
};

export default dataProvider;