import axios from "axios";
import { SPRING_URL} from "./env";

export const api = axios.create({
    baseURL: SPRING_URL
})