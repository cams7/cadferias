export interface BaseEntity {
    entityId: number;
    links: LinkWithRel[];
    _links: any;
}

export const getRel = (_links: any, rel: string) => {
    if(!rel || !_links)
        return undefined;
    
    return <Link>_links[rel];
}

export const getRelByLinks = (links: LinkWithRel[], rel: string) => {
    if(!rel || !links || links.length == 0)
        return undefined;
    
    return links.find(link => link.rel == rel);
}

export interface LinkWithRel extends Link {
    rel: string,    
    media: MediaType
}

export interface Link {
    href: string,
    hreflang: Locale,
    title: string,
    type: RequestMethod,
    deprecation: Boolean
}

export const GET_BY_SEARCH_REL='getBySearch';
export const GET_BY_ID_REL ='getById';
export const GET_WITH_AUDIT_BY_ID_REL='getWithAuditById';
export const UPDATE_REL='update';    
export const DELETE_REL='delete';

export enum Locale {
    PT_BR = 'pt-BR'
}

export enum MediaType {
    APPLICATION_JSON_UTF8_VALUE = 'application/json;charset=UTF-8'
}

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}