import { NavLink } from "react-router";
import { Flex } from "antd";

export function Logo() {
  return (
    <NavLink to={"/"}>
      <Flex>
        <svg width="111" height="24" fill="none">
          <rect width="6" height="22" fill="#000" rx="1" />
          <rect width="6" height="22" x="8" fill="#000" rx="1" />
          <rect
            width="6"
            height="22"
            x="15.223"
            y="1.684"
            fill="#000"
            rx="1"
            transform="rotate(-10 15.223 1.684)"
          />
          <path
            fill="#000"
            d="M38.13 17.12q-1.065 0-2.01-.315a3.7 3.7 0 0 1-1.56-1.035q-.63-.72-.825-1.875h1.905q.18.585.57.915.405.33.945.465.54.12 1.095.12.495 0 .93-.12.45-.135.735-.435.3-.3.3-.795 0-.375-.165-.6-.15-.24-.435-.39-.27-.165-.66-.255-.375-.12-.81-.21t-.855-.195-.795-.27a10 10 0 0 1-.93-.375q-.435-.225-.765-.54a2.4 2.4 0 0 1-.51-.78q-.195-.465-.195-1.11 0-.735.24-1.26a2.6 2.6 0 0 1 .66-.885q.42-.345.93-.54.525-.195 1.08-.285.57-.09 1.08-.09.99 0 1.8.33.825.33 1.35 1.02t.6 1.77H40.02q-.06-.51-.36-.81-.3-.315-.75-.45-.45-.15-.975-.15-.36 0-.72.06-.345.06-.63.21-.27.15-.45.405-.165.24-.165.615 0 .33.165.585.165.24.45.405.3.165.705.3.525.21 1.14.315.63.105 1.185.285.54.15.99.375.465.21.795.525.33.3.51.75.195.435.195 1.05 0 .9-.33 1.53a2.7 2.7 0 0 1-.885 1.005q-.555.39-1.275.57-.705.165-1.485.165m5.613-.12V6.395h1.83v3.72q.315-.405.735-.66t.885-.36q.465-.12.885-.12 1.125 0 1.77.495t.9 1.32q.27.825.27 1.86V17h-1.83v-4.035q0-.405-.06-.825t-.24-.75q-.165-.345-.51-.555-.33-.21-.885-.21-.525 0-.9.225-.375.21-.6.585-.21.375-.315.825t-.105.9V17zm11.514.105q-.555 0-1.05-.15-.494-.15-.885-.435-.39-.3-.63-.735a2.3 2.3 0 0 1-.224-1.05q0-.765.3-1.245.3-.495.81-.75.524-.255 1.185-.345.66-.105 1.38-.105h1.544q0-.525-.164-.9a1.3 1.3 0 0 0-.526-.615q-.345-.225-.9-.225-.36 0-.675.09-.3.075-.524.255a.9.9 0 0 0-.3.435h-1.876q.105-.615.42-1.05.33-.45.795-.735.48-.285 1.05-.42.57-.15 1.155-.15 1.725 0 2.505.99.795.99.796 2.775V17h-1.62l-.045-1.02q-.345.51-.825.75t-.93.3q-.45.075-.766.075m.36-1.485q.6 0 1.066-.225.464-.225.734-.63.285-.405.285-.93v-.255h-1.44q-.36 0-.72.03-.345.015-.63.12-.284.09-.465.285-.165.195-.165.555t.18.585q.195.225.495.345.315.12.66.12M61.19 17V9.095h1.665l.105 1.035q.3-.45.675-.69.39-.255.825-.36.45-.105.9-.105h.3q.15 0 .24.015v1.74h-.48q-.78 0-1.32.3t-.81.855-.27 1.365V17zm9.18.105q-1.23 0-2.1-.51a3.35 3.35 0 0 1-1.306-1.41q-.435-.915-.435-2.115t.45-2.115A3.5 3.5 0 0 1 68.3 9.5q.87-.525 2.085-.525.9 0 1.575.33.675.315 1.125.87.465.555.69 1.26t.21 1.485l-.03.36q-.015.165-.045.36h-5.55q.045.525.27.96.24.435.66.69.435.255 1.08.255.375 0 .72-.09.345-.105.6-.3a.93.93 0 0 0 .36-.495h1.83q-.195.855-.72 1.395t-1.26.795q-.72.255-1.53.255m-1.98-4.83h3.81q0-.495-.226-.9-.225-.405-.645-.63-.405-.24-.99-.24-.63 0-1.05.255t-.645.66-.255.855M75.727 17V6.395h4.35q.735 0 1.35.135.63.12 1.08.435.465.315.72.84t.255 1.305q0 .72-.33 1.32-.33.585-.975.885.87.225 1.335.87.465.63.465 1.65 0 .915-.345 1.53-.33.6-.93.96a4.3 4.3 0 0 1-1.365.525q-.78.15-1.665.15zm1.875-1.71h2.235q.42 0 .825-.06t.735-.21.51-.435q.195-.3.195-.765 0-.42-.15-.69t-.42-.42a1.6 1.6 0 0 0-.615-.225q-.36-.075-.75-.075h-2.565zm0-4.455h1.98q.465 0 .84-.09t.645-.27q.27-.195.42-.465.15-.285.15-.69 0-.525-.24-.78-.24-.27-.66-.345-.405-.09-.915-.09h-2.22zm11.489 6.27q-1.215 0-2.1-.495-.87-.495-1.35-1.41-.465-.915-.465-2.145 0-1.245.48-2.145a3.5 3.5 0 0 1 1.35-1.425q.87-.51 2.085-.51 1.2 0 2.07.51t1.335 1.44q.465.915.465 2.16 0 1.215-.465 2.13-.45.9-1.32 1.395t-2.085.495m-.015-1.665q.75 0 1.2-.33.465-.33.675-.87t.21-1.17-.21-1.185a1.87 1.87 0 0 0-.675-.885q-.45-.345-1.2-.345T87.862 11q-.465.33-.675.885-.21.54-.21 1.185 0 .63.21 1.185.225.54.675.87.465.315 1.215.315m8.965 1.665q-1.215 0-2.1-.495-.87-.495-1.35-1.41-.465-.915-.465-2.145 0-1.245.48-2.145a3.5 3.5 0 0 1 1.35-1.425q.87-.51 2.085-.51 1.2 0 2.07.51t1.335 1.44q.465.915.465 2.16 0 1.215-.465 2.13-.45.9-1.32 1.395t-2.085.495m-.015-1.665q.75 0 1.2-.33.465-.33.675-.87t.21-1.17-.21-1.185a1.87 1.87 0 0 0-.675-.885q-.45-.345-1.2-.345T96.812 11q-.465.33-.675.885-.21.54-.21 1.185 0 .63.21 1.185.225.54.675.87.465.315 1.215.315m5.35 1.56V6.395h1.83v5.865h1.14l2.085-3.165h2.055l-2.565 3.765 2.775 4.14h-2.13l-2.115-3.135h-1.245V17z"
          />
        </svg>
      </Flex>
    </NavLink>
  );
}
