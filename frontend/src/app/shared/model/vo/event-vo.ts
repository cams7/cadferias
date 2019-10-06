export interface EventVO {
    from: EventFrom,
    type: EventType
}
  
export enum EventFrom {
    CONFIRM_MODAL,
    SIGNIN_MODAL
}
  
export enum EventType {
    MODAL_CLOSE,
    MODAL_CONFIRM_AND_CLOSE
}