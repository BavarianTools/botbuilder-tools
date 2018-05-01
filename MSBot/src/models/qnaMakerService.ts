import { IQnAService, ServiceType } from '../schema';
import { ConnectedService } from './connectedService';

export class QnaMakerService extends ConnectedService implements IQnAService {
    public readonly type = ServiceType.QnA;
    public id = '';
    public name = '';
    public kbId = '';
    public subscriptionKey = '';
    public hostname = '';
    public endpointKey = '';

    constructor(source: IQnAService) {
        super(source);
        const { kbId = '', name = '', subscriptionKey = '', endpointKey = '', hostname = '' } = source;
        Object.assign(this, { kbId, name, subscriptionKey, endpointKey, hostname });
    }

    public toJSON(): IQnAService {
        let { kbId, id, name, subscriptionKey, endpointKey, hostname } = this;
        if (!id) {
            id = kbId;
        }
        return { kbId, name, type: ServiceType.QnA, subscriptionKey, id, endpointKey, hostname };
    }
}
