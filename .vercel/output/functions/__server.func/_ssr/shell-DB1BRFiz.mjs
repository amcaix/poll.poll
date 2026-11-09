import { o as __toESM } from "../_runtime.mjs";
import { c as parseToken, o as parseCode, s as parseCreateInput } from "./poll-qphCWIbR.mjs";
import { f as require_jsx_runtime, p as require_react, u as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DB1BRFiz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-card text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-accent",
			secondary: "bg-muted text-foreground hover:bg-accent",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4 py-2",
			sm: "h-9 rounded-md px-3 text-sm",
			lg: "h-12 rounded-lg px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var VOTER_KEY = "soh-voter";
function hostKey(code) {
	return `soh-host:${code}`;
}
function getVoterToken() {
	const existing = localStorage.getItem(VOTER_KEY);
	if (existing) return existing;
	const next = crypto.randomUUID();
	localStorage.setItem(VOTER_KEY, next);
	return next;
}
function rememberHost(code, hostToken) {
	localStorage.setItem(hostKey(code), hostToken);
}
function readHostToken(code) {
	return localStorage.getItem(hostKey(code));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createPoll = createServerFn({ method: "POST" }).validator((input) => parseCreateInput(input)).handler(createSsrRpc("af38cadff5271c6609c77fec0328227f7da21e45d84401471c3293531c7eca68"));
var getPoll = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Enter a poll code.");
	const raw = input;
	return {
		code: parseCode(raw.code),
		voterToken: raw.voterToken ? parseToken(raw.voterToken, "voter") : null
	};
}).handler(createSsrRpc("b5322e4c6e8c5c0415537fc5edf42d62cb3ea8088ed3ff657752efc798fd79f5"));
var castVote = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("That vote could not be read.");
	const raw = input;
	const optionId = typeof raw.optionId === "string" ? raw.optionId.trim() : "";
	if (!/^[0-9a-f-]{36}$/i.test(optionId)) throw new Error("Pick a choice on this poll.");
	return {
		code: parseCode(raw.code),
		optionId,
		voterToken: parseToken(raw.voterToken, "voter")
	};
}).handler(createSsrRpc("b14445d5fbda067040a7ff38ab8864227f5bb9abc7ef09e03f79f0c705101156"));
var resetPoll = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("That reset could not be read.");
	const raw = input;
	return {
		code: parseCode(raw.code),
		hostToken: parseToken(raw.hostToken, "host")
	};
}).handler(createSsrRpc("edcb2dc5b59a302237d4f44293463fb9d5218efea4ed055b2ca02a39bd54dfba"));
function PollShell({ children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-y-0 left-0 w-1.5 bg-primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-6 pb-16 sm:px-6 sm:pt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-baseline justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-lg tracking-tight text-foreground italic",
					children: "Show of Hands"
				}), action]
			}), children]
		})]
	});
}
//#endregion
export { cn as a, getVoterToken as c, resetPoll as d, castVote as i, readHostToken as l, PollShell as n, createPoll as o, buttonVariants as r, getPoll as s, Button as t, rememberHost as u };
