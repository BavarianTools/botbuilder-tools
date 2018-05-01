import { IDispatchService, ServiceType } from '../schema';
import { ConnectedService } from './connectedService';

export class DispatchService extends ConnectedService implements IDispatchService {
    public readonly type = ServiceType.Dispatch;
    public appId = '';
    public authoringKey = '';
    public serviceIds: string[] = [];
    public subscriptionKey = '';
    public version = '';

    constructor(source: IDispatchService) {
        super(source);
        const { appId = '', authoringKey = '', serviceIds = [], subscriptionKey = '', version = '' } = source;
        Object.assign(this, { appId, authoringKey, serviceIds, subscriptionKey, version });
    }

    public toJSON(): IDispatchService {
        let { appId, id, authoringKey, name, serviceIds, subscriptionKey, version } = this;
        if (!id) {
            id = appId;
        }
        return { appId, id, authoringKey, name, serviceIds, subscriptionKey, type: ServiceType.Dispatch, version };
    }
}
