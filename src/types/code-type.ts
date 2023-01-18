export interface CodeType {
  label: string;
  value: number;
  disabled?: boolean;
  describe?: string;
  transform: CodeTypeTransform;
}

export type CodeTypeTransform = (json: Record<any, any> | string) => string;
