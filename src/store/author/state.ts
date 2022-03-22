export interface AuthorStateInterface {
  prop: boolean;
}

function state(): AuthorStateInterface {
  return {
    prop: false,
  };
}

export default state;
