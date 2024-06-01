import { Component } from "solid-js";
import AdminNav from "../components/navigation/AdminNav";

const AdminLayout:Component = ({children}: any) => {
    return (
        <div class="w-11/12 m-auto pt-20 flex gap-3">
            <div class="w-[330px] border bg-gray-200 rounded-sm">
                <AdminNav />
            </div>
            <div class="w-full relative h-[87vh] bg-gray-200 p-5 border rounded-sm">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;