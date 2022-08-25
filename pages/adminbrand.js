
import { Fragment } from "react";
import BaseAdmin from "../layout/BaseAdmin";
import Brands from "../modules/Admin Panel/Brands";
export default function home() {
    return (
        <Fragment>  
            <BaseAdmin>
                <Brands></Brands>
            </BaseAdmin>
        </Fragment>
    );
}