import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class CreateUpdateSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE DATA INSERTED: `, event.entity);
    if (event?.entity?.user?.id) {
      event.entity.createdBy = event?.entity?.user?.id;
      event.entity.updatedBy = event?.entity?.user?.id;
    }
  }
}
