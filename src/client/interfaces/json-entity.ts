export enum JsonEntityField {
  UUID = 'uuid',
  NAME = 'name',
  GROUP = 'group',
  PRICE = 'price',
  COST_PRICE = 'costPrice',
  QUANTITY = 'quantity',
  PARENT_UUID = 'parentUuid',
  CODE = 'code',
  HAS_VARIANTS = 'hasVariants',
  ALLOW_TO_SELL = 'allowToSell',
  MEASURE_NAME = 'measureName',
  DESCRIPTION = 'description',
  ARTICLE_NUMBER = 'articleNumber',
  TAX = 'tax',
  TYPE = 'type',
  BAR_CODES = 'barCodes',
}

export type JsonEntity = {
  [JsonEntityField.UUID]: string;
  [JsonEntityField.NAME]: string;
  [JsonEntityField.GROUP]: boolean;
  [JsonEntityField.HAS_VARIANTS]?: boolean;
  [JsonEntityField.CODE]?: number;
  [JsonEntityField.PARENT_UUID]?: string;
  [JsonEntityField.MEASURE_NAME]?: string;
  [JsonEntityField.ALLOW_TO_SELL]?: boolean;
  [JsonEntityField.DESCRIPTION]?: string;
  [JsonEntityField.ARTICLE_NUMBER]?: number;
  [JsonEntityField.TAX]?: string;
  [JsonEntityField.TYPE]?: 'NORMAL' | 'TOBACCO_MARKED';
  [JsonEntityField.PRICE]?: number;
  [JsonEntityField.COST_PRICE]?: number;
  [JsonEntityField.QUANTITY]?: number;
  [JsonEntityField.BAR_CODES]?: string[];
};
