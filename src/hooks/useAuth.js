import { use } from "react";
import { MyContext } from "../provider/ContextProvider";

const useAuth = ()=>{
    const authInfo = use(MyContext);
    return authInfo;
}
export default useAuth;