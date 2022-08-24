
import { Fragment } from "react";
import BaseAdmin from "../layout/BaseAdmin";
import Dashboard from '../modules/Admin Panel/Dashboard'
export default function home() {
    return (
        <Fragment>  
            <BaseAdmin>
                <Dashboard></Dashboard>
            </BaseAdmin>
        </Fragment>
    );
}