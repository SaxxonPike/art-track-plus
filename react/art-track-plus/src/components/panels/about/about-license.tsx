import React, {memo} from "react";
import "./about-license.scss";

function AboutLicense() {
    const thisYear = new Date().getFullYear();

    return (
        <div className={"about-license"}>
            <h3 className={"text-center"}>
                ISC License
            </h3>
            <p className={"text-center"}>
                Copyright &copy; 2014-{thisYear} Saxxon Fox
            </p>
            <p>
                Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee
                is hereby granted, provided that the above copyright notice and this permission notice appear in all
                copies.
            </p>
            <p>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot; AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
                SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
                AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
                WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
                OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
                SOFTWARE.
            </p>
        </div>
    )
}

export default memo(AboutLicense);