import { Publisher } from "src/interfaces/publisher.interface";

export interface PublisherStateInterface {
  allPublisher:Publisher[],
  newPublisher?:Publisher
}

function state(): PublisherStateInterface {
  return {
    allPublisher:[],
  };
}

export default state;
