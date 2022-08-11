
import { Fragment } from "react";
import BaseVendor from "../../layout/BaseVendor";
import Notification from '../../modules/Vendors Panel/Notification'

export default function home() {
    return (
        <Fragment>  
            <BaseVendor>
                <Notification></Notification>
            </BaseVendor>
        </Fragment>
    );
}