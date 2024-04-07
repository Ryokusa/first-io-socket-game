import { TAuthenticatedContext } from "@/types";
import { Input } from "./Input";

export interface Player {
  auth: TAuthenticatedContext;
  id: string;
  name: string;
  input: Input;
}
