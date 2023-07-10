export type Resource<TSpec extends object = any> = {
  /**
   * ID for the resource
   */
  id: ResourceID;
  /**
   * Common metadata for the resource
   */
  meta: ResourceMeta;
  /**
   * Specific fields for this resource
   */
  spec: TSpec;
};

type ResourceID = string;

type ResourceMeta = {
  /**
   * ISO 8601 formatted date string
   */
  create_time: string;
  /**
   * ISO 8601 formatted date string
   */
  update_time?: string;
};

export type Tag = Resource<{
  value: string;
}>;

export type Todo = Resource<{
  note: string;
  /**
   * ISO 8601 formatted date string
   */
  completed_time?: string;
  /**
   * Reference to the User to whom the Todo belongs
   */
  user_id: ResourceID;
  /**
   * (optional) references to the Tags that may be added to a Todo
   */
  tag_ids?: ResourceID[];
}>;

export type User = Resource<{
  name: string;
}>;
