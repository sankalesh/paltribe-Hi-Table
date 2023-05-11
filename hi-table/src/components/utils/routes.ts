const BASE_ROUTE = "hiTable";

const withBusinessId = (businessId: string, route: string) =>
  `/${BASE_ROUTE}/${businessId}${route}`;


  export const PAGE_TYPES = {
    LOGIN: "Login",
    ZONES:'zones',
    TABLES:'tables',
    ALERT:'alert',
    STATUS:'status'
  }

  export const routePaths = {
    [PAGE_TYPES.LOGIN]:(businessId:string)=> withBusinessId(businessId, "/login"),
    [PAGE_TYPES.ZONES]:(businessId:string)=> withBusinessId(businessId, "/zones"),
    [PAGE_TYPES.TABLES]:(businessId:string)=> withBusinessId(businessId, "/tables"),
    [PAGE_TYPES.ALERT]:(businessId:string)=> withBusinessId(businessId, "/alert"),
  }