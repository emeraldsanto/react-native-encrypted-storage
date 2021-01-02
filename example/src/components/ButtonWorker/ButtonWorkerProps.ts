export type WorkCallback = () => void;

export interface ButtonWorkerProps {
  title?: string;
  onPress?: (done: WorkCallback) => void;
}
