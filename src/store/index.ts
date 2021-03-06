import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from "vuex";

import account from "./account";
import { AccountStateInterface } from "./account/state";

import auth from "./auth";
import { IAuthState } from "./auth/state";

import category from "./category";
import { CategoryStateInterface } from "./category/state";

import publisher from "./publisher";
import { PublisherStateInterface } from "./publisher/state";

import borrower from "./borrower";
import { BorrowerStateInterface } from "./borrower/state";

import issuedbook from "./issued-book";
import { IssuedBookStateInterface } from "./issued-book/state";

import book from "./book";
import { BookStateInterface } from "./book/state";

import bookfines from "./book-fines";
import { BookFinestateInterface } from "./book-fines/state";

import media from "./media-module";
import { MediaStateInterface } from "./media-module/state";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  account: AccountStateInterface;
  auth: IAuthState;
  category: CategoryStateInterface;
  publisher: PublisherStateInterface;
  borrower: BorrowerStateInterface;
  issuedbook: IssuedBookStateInterface;
  book: BookStateInterface;
  bookfines: BookFinestateInterface;
  media: MediaStateInterface;
}

// provide typings for `this.$store`
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol("vuex-key");

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      account,
      auth,
      category,
      publisher,
      borrower,
      issuedbook,
      book,
      bookfines,
      media,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
