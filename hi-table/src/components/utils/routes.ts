const BASE_ROUTE = "hiTable";

const withBusinessId = (businessId: string, route: string) =>
  `/${BASE_ROUTE}/${businessId}${route}`;

export const PAGE_TYPES = {
  LOGIN: "Login",
  ZONE: "zone",
  TABLES: "tables",
  ALERT: "alert",
  STATUS: "status",
  ORDER: "orders",
  SINGLE_TABLE: "single",
  KICK_USER:'kickUser'
};

export const routePaths = {
  
  [PAGE_TYPES.TABLES]: (businessId: string, zoneId: string) =>
    withBusinessId(businessId, `/zone/${zoneId}`),
  [PAGE_TYPES.ALERT]: (businessId: string, zoneId: string) =>
    withBusinessId(businessId, `/zone/${zoneId}/alert`),
  [PAGE_TYPES.STATUS]: (businessId: string, zoneId: string) =>
    withBusinessId(businessId, `/zone/${zoneId}/status`),
  [PAGE_TYPES.ORDER]: (businessId: string, zoneId: string) =>
    withBusinessId(businessId, `/zone/${zoneId}/orders`),
};
export const singleRoute={
  [PAGE_TYPES.LOGIN]: (businessId: string) =>
  withBusinessId(businessId, "/login"),
[PAGE_TYPES.ZONE]: (businessId: string) =>
  withBusinessId(businessId, "/zone"),
}

export const newRoutes = {
  [PAGE_TYPES.SINGLE_TABLE]: (
    businessId: string,
    zoneId: string,
    tableId: string
  ) => withBusinessId(businessId, `/zone/${zoneId}/${tableId}`),
  [PAGE_TYPES.KICK_USER]: (
    businessId: string,
    zoneId: string,
    tableId: string
  ) => withBusinessId(businessId, `/zone/${zoneId}/${tableId}/kickUser`),
}
