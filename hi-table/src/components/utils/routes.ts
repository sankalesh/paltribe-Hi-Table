const BASE_ROUTE = "hiTable";

const withBusinessId = (businessId: string, route: string) =>
  `/${BASE_ROUTE}/${businessId}${route}`;


  export const PAGE_TYPES = {
    LOGIN: "Login",
    ZONE:'zone',
    ALL_TABLES:'tables',
    ALERT:'alert',
    STATUS:'status',
    ORDER :'orders'
  }

  export const routePaths = {
    [PAGE_TYPES.LOGIN]:(businessId:string)=> withBusinessId(businessId, "/login"),
    [PAGE_TYPES.ZONE]:(businessId:string)=> withBusinessId(businessId, "/zone"),
    [PAGE_TYPES.ALL_TABLES]:(businessId:string,zoneId:string)=> withBusinessId(businessId, `/zone/${zoneId}`),
    [PAGE_TYPES.ALERT]:(businessId:string)=> withBusinessId(businessId, "/alert"),
    [PAGE_TYPES.STATUS]:(businessId:string)=> withBusinessId(businessId, "/status"),
    [PAGE_TYPES.ORDER]:(businessId:string)=> withBusinessId(businessId, "/orders"),

  }