import publisherService from "src/services/publisher.service";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { PublisherStateInterface } from "./state";

const actions: ActionTree<PublisherStateInterface, StateInterface> = {
  async addPublisher(context, payload: any): Promise<any> {
    const result = await publisherService.create(payload);
    context.commit("setNewPublisher", result);
    await context.dispatch("getAllpublisher");
  },

  async editPublisher(context, payload: any): Promise<any> {
    const result = await publisherService.update(payload.id, payload);
    context.commit("updatePublisher", result);
    await context.dispatch("getAllpublisher");
  },

  async deletePublisher(context, id: number): Promise<any> {
    const result = await publisherService.delete(id);
    context.commit("deletePublisher", result);
    await context.dispatch("getAllpublisher");
  },

  async getAllPublisher(context): Promise<any> {
    const res = await publisherService.getAll();
    context.commit("getAllPublisher", res);
  },

  async getOnePublisher(context, id: number): Promise<any> {
    const res = await publisherService.getOne(id);
    context.commit("getOnePublisher", res);
  },
};

export default actions;
