import { Component, For } from "solid-js";
import Links from '../../data/Links'
import { useLocation } from "@solidjs/router";

const AdminNav: Component = () => {
    const location = useLocation();

    return (
        <ul>
            <For each={Links}>{
                (l) => (
                    <a href={l.link}>
                        <li class={`py-2 px-5 ${location.pathname === l.link ? 'bg-black text-white' : ''}`}>
                            {l.title}
                        </li>
                    </a>
                )
            }</For>
        </ul>
    );
};

export default AdminNav;