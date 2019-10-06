export interface MessageVO {
    type: MessageType;
    title: string;
    message: string;
    codeMessage: string;
}

export enum MessageType {
    SUCCESS='success',
    INFO='info',
    WARNING='warning',
    DANGER='danger'
}