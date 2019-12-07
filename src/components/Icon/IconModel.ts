interface IConstructor {
  path: string;
  authorUrl: string;
}

export class IconModel {
  data: string;
  authorUrl: string;
  constructor(props: IConstructor) {
    const { authorUrl, path } = props;
    this.data = path;
    this.authorUrl = authorUrl;
  }
}
