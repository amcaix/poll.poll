import { o as __toESM } from "../_runtime.mjs";
import { a as optionLetter, n as SAMPLE_QUESTION, r as extractCode, s as parseCreateInput, t as SAMPLE_LABELS } from "./poll-qphCWIbR.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, n as Trash2 } from "../_libs/lucide-react.mjs";
import { a as cn, n as PollShell, o as createPoll, t as Button, u as rememberHost } from "./shell-DB1BRFiz.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4uYIBrB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
	...props
}));
Label.displayName = Root.displayName;
function JoinForm() {
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	function submit(event) {
		event.preventDefault();
		const next = extractCode(code);
		if (next.length !== 6) {
			setError("Enter the 6-character code, or paste the poll link.");
			return;
		}
		navigate({
			to: "/p/$code",
			params: { code: next }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: submit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "join-code",
					children: "Poll code"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "join-code",
					value: code,
					onChange: (event) => {
						setCode(event.target.value.toUpperCase());
						setError(null);
					},
					placeholder: "AB3K9Q",
					autoCapitalize: "characters",
					autoCorrect: "off",
					spellCheck: false,
					maxLength: 80,
					"aria-invalid": Boolean(error)
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "outline",
				className: "w-full sm:w-auto",
				children: "Join poll"
			})
		]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-lg border border-input bg-card px-3 py-3 text-base text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function PollComposer() {
	const navigate = useNavigate();
	const [question, setQuestion] = (0, import_react.useState)(SAMPLE_QUESTION);
	const [options, setOptions] = (0, import_react.useState)(SAMPLE_LABELS);
	const [error, setError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const filled = (0, import_react.useMemo)(() => options.map((label) => label.trim()).filter(Boolean), [options]);
	function updateOption(index, value) {
		setOptions((current) => current.map((label, i) => i === index ? value : label));
		setError(null);
	}
	function addOption() {
		if (options.length >= 6) return;
		setOptions((current) => [...current, ""]);
	}
	function removeOption(index) {
		if (options.length <= 2) return;
		setOptions((current) => current.filter((_, i) => i !== index));
	}
	async function handleStart() {
		let parsed;
		try {
			parsed = parseCreateInput({
				question,
				options: filled
			});
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Check the poll and try again.");
			return;
		}
		setSaving(true);
		setError(null);
		try {
			const result = await createPoll({ data: parsed });
			rememberHost(result.poll.code, result.hostToken);
			await navigate({
				to: "/p/$code",
				params: { code: result.poll.code }
			});
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "The poll did not open. Try again.");
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-6",
		onSubmit: (event) => {
			event.preventDefault();
			handleStart();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "poll-question",
						children: "Question"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "poll-question",
						value: question,
						onChange: (event) => {
							setQuestion(event.target.value);
							setError(null);
						},
						placeholder: "Where should we go this weekend?",
						maxLength: 140,
						rows: 3,
						disabled: saving
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: [question.trim().length, "/140"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "flex flex-col gap-3",
				disabled: saving,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-medium text-foreground",
						children: "Choices"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: options.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground",
									children: optionLetter(index)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: label,
									onChange: (event) => updateOption(index, event.target.value),
									placeholder: index === 0 ? "First choice" : "Another choice",
									maxLength: 60,
									"aria-label": `Choice ${optionLetter(index)}`,
									className: "flex-1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									className: cn("shrink-0 text-muted-foreground", options.length <= 2 && "invisible"),
									onClick: () => removeOption(index),
									disabled: options.length <= 2,
									"aria-label": `Remove choice ${optionLetter(index)}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, index))
					}),
					options.length < 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: addOption,
						className: "self-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add choice"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Six choices is the limit."
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				className: "w-full sm:w-auto",
				disabled: saving,
				children: saving ? "Opening the floor…" : "Open the floor"
			})
		]
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root$1.displayName;
function PollHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PollShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
						children: "Shared poll"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl",
						children: "What does the room think?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-base leading-relaxed text-muted-foreground",
						children: "Open a poll and send the link. Every phone votes once, and the bars update for everyone."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PollComposer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: "Already have a code?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: "Type the code from the host, or paste their link."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinForm, {})
				]
			})
		]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PollHome, {});
}
//#endregion
export { Home as component };
