class S4SLoginBase extends S4SBase{constructor(){super()}createElement(e,n){const{classes:t,innerText:r,innerHTML:s,attributes:a}=n,c=document.createElement(e);if(s?c.innerHTML=s:r&&(c.innerText=r),t&&t.forEach(e=>{c.classList.add(e)}),a)for(const e in a)c.setAttribute(e,a[e]);return c}appendChildren(e,n){return n.forEach(n=>{n&&e.appendChild(n)})}}