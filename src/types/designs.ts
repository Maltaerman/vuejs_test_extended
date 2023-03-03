export interface IDesign {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly link: string;
  readonly images: (string | File)[];
}

export interface ICreateDesignPayload {
  readonly code: string;
  readonly name: string;
  readonly link: string;
  readonly images: (string | File)[];
}
