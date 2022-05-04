import publisherService from "src/services/publisher.service";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { PublisherStateInterface } from "./state";

const actions: ActionTree<PublisherStateInterface, StateInterface> = {
  async addPublisher(context, payload: any): Promise<any> {
    const result = await publisherService.create(payload);
    context.commit("setNewPublisher", result);
    await context.dispatch("getAllPublisher");
  },

  async editPublisher(context, payload: any): Promise<any> {
    const result = await publisherService.update(payload.Publisher_ID, payload);
    context.commit("updatePublisher", payload);
    await context.dispatch("getAllPublisher");
  },

  async deletePublisher(context, Publisher_ID: number): Promise<any> {
    const result = await publisherService.delete(Publisher_ID);
    context.commit("deletePublisher", result);
    await context.dispatch("getAllPublisher");
  },

  async getAllPublisher(context): Promise<any> {
    const res = await publisherService.getAll();
    context.commit("getAllPublisher", res);
  },

  async getOnePublisher(context, Publisher_ID: number): Promise<any> {
    const res = await publisherService.getOne(Publisher_ID);
    context.commit("getOnePublisher", res);
  },
};

export default actions;
