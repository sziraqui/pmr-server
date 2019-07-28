export type StreamProcessorStatus = 'STOPPED' | 'STARTING' | 'RUNNING' | 'FAILED' | 'STOPPING' | '';
export class StreamProcessor {
    /**
     * 
     * @param Name name of stream processor
     * @param Status 
     */
    constructor(public Name: string = 'defaultStream', public Status: StreamProcessorStatus = 'STARTING') { }
}
