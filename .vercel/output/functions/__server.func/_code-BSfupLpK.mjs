import { o as __toESM } from "./_runtime.mjs";
import { a as optionLetter, i as leadingOptionIds, l as totalVotes, r as extractCode, u as votePercents } from "./_ssr/poll-qphCWIbR.mjs";
import { a as Overlay2, c as Title2, f as require_jsx_runtime, i as Description2, n as Cancel, o as Portal2, p as require_react, r as Content2, s as Root2, t as Action } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as RotateCcw, o as Copy, r as Share2, s as Check } from "./_libs/lucide-react.mjs";
import { n as Route } from "./_ssr/router-BUNR2TqB.mjs";
import { a as cn, c as getVoterToken, d as resetPoll, i as castVote, l as readHostToken, n as PollShell, r as buttonVariants, s as getPoll, t as Button } from "./_ssr/shell-DB1BRFiz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-BSfupLpK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-6 text-card-foreground shadow-[var(--shadow-border-hover)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2 text-left", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm leading-relaxed text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function OptionRow({ option, index, percent, total, selected, disabled, leading, onVote }) {
	const letter = optionLetter(index);
	const showResults = total > 0;
	const barScale = showResults ? percent / 100 : 0;
	const voteLabel = `${option.votes} ${option.votes === 1 ? "vote" : "votes"}`;
	const ariaLabel = [
		`${letter}. ${option.label}`,
		selected ? "Your vote" : null,
		leading && showResults ? "Ahead" : null,
		showResults ? `${percent} percent, ${voteLabel}` : "No votes yet",
		disabled && !selected ? "Voting locked" : null
	].filter(Boolean).join(". ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "radio",
		"aria-checked": selected,
		"aria-label": ariaLabel,
		"aria-disabled": disabled,
		disabled,
		onClick: () => onVote(option.id),
		className: cn("group relative min-h-16 w-full overflow-hidden rounded-xl text-left", "shadow-[var(--shadow-border)] transition-[box-shadow,transform,opacity] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", "motion-reduce:transition-none", selected ? "bg-card shadow-[var(--shadow-border-hover)] ring-2 ring-primary ring-offset-2 ring-offset-background" : "bg-card", !disabled && !selected && "hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]", disabled && !selected && "opacity-60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: cn("absolute inset-y-0 left-0 origin-left bg-primary/12 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none", selected && "bg-primary/20"),
			style: { transform: `scaleX(${barScale})` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative z-10 flex items-center gap-3 px-3.5 py-3.5 sm:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold tracking-wide", selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-4",
						strokeWidth: 2.5
					}) : letter
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium leading-snug text-foreground",
						children: option.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground",
						children: [selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-primary",
							children: "Your vote"
						}) : null, leading && showResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected ? "· Ahead" : "Ahead" }) : null]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 flex-col items-end leading-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-medium tabular-nums tracking-tight text-foreground sm:text-2xl",
						children: showResults ? `${percent}%` : "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 text-xs tabular-nums text-muted-foreground",
						children: [
							option.votes,
							" ",
							option.votes === 1 ? "vote" : "votes"
						]
					})]
				})
			]
		})]
	});
}
function messageFrom(error, fallback) {
	return error instanceof Error && error.message ? error.message : fallback;
}
function PollRoom({ code }) {
	const normalized = extractCode(code);
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [poll, setPoll] = (0, import_react.useState)(null);
	const [isHost, setIsHost] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const [origin, setOrigin] = (0, import_react.useState)("");
	const busyRef = (0, import_react.useRef)(false);
	const load = (0, import_react.useCallback)(async () => {
		if (normalized.length !== 6) {
			setStatus("missing");
			return;
		}
		const snapshot = await getPoll({ data: {
			code: normalized,
			voterToken: getVoterToken()
		} });
		if (!snapshot) {
			setPoll(null);
			setStatus("missing");
			return;
		}
		setPoll(snapshot);
		setStatus("ready");
		setError(null);
	}, [normalized]);
	(0, import_react.useEffect)(() => {
		setOrigin(window.location.origin);
		setIsHost(Boolean(readHostToken(normalized)));
	}, [normalized]);
	(0, import_react.useEffect)(() => {
		let stop = false;
		const tick = async () => {
			if (busyRef.current || document.hidden) return;
			try {
				await load();
			} catch (caught) {
				if (stop) return;
				setPoll((current) => {
					if (!current) setStatus("error");
					return current;
				});
				setError(messageFrom(caught, "Could not refresh the poll."));
			}
		};
		tick();
		const id = window.setInterval(() => {
			tick();
		}, 1500);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [load]);
	const shareUrl = `${origin}/p/${normalized}`;
	const total = poll ? totalVotes(poll.options) : 0;
	const percents = poll ? votePercents(poll.options) : [];
	const leaders = poll ? leadingOptionIds(poll.options) : [];
	const uniqueLead = leaders.length === 1 ? leaders[0] : null;
	const votedLabel = poll?.options.find((option) => option.id === poll.myOptionId)?.label;
	async function vote(optionId) {
		if (!poll || poll.myOptionId || busyRef.current) return;
		busyRef.current = true;
		setBusy(true);
		setError(null);
		setPoll({
			...poll,
			myOptionId: optionId,
			options: poll.options.map((option) => option.id === optionId ? {
				...option,
				votes: option.votes + 1
			} : option)
		});
		try {
			const next = await castVote({ data: {
				code: normalized,
				optionId,
				voterToken: getVoterToken()
			} });
			setPoll(next);
		} catch (caught) {
			setError(messageFrom(caught, "That vote did not go through."));
			try {
				await load();
			} catch {}
		} finally {
			busyRef.current = false;
			setBusy(false);
		}
	}
	async function share() {
		const url = `${window.location.origin}/p/${normalized}`;
		if (typeof navigator.share === "function") try {
			await navigator.share({
				title: poll?.question ?? "Show of Hands",
				text: "Vote in this poll. One vote per phone.",
				url
			});
			return;
		} catch (caught) {
			if (caught instanceof Error && caught.name === "AbortError") return;
		}
		await copyLink();
	}
	async function copyLink() {
		const url = `${window.location.origin}/p/${normalized}`;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2e3);
		} catch {
			setError("Copy the link below and send it.");
		}
	}
	async function reset() {
		const hostToken = readHostToken(normalized);
		if (!hostToken) return;
		busyRef.current = true;
		setBusy(true);
		setError(null);
		try {
			const next = await resetPoll({ data: {
				code: normalized,
				hostToken
			} });
			setPoll({
				...next,
				myOptionId: null
			});
			setConfirmReset(false);
		} catch (caught) {
			setError(messageFrom(caught, "The votes could not be cleared."));
		} finally {
			busyRef.current = false;
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PollShell, {
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground",
			children: "New question"
		}),
		children: [
			status === "loading" && !poll ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base text-muted-foreground",
				children: "Opening the poll…"
			}) : null,
			status === "missing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-medium tracking-tight",
						children: "No poll with that code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: "Check the 6 characters and try again, or start a new question."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "w-full sm:w-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Back home"
						})
					})
				]
			}) : null,
			status === "error" && !poll ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-medium tracking-tight",
						children: "The poll did not load"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "w-full sm:w-auto",
						onClick: () => void load(),
						children: "Try again"
					})
				]
			}) : null,
			poll ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
									children: "Live poll"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm text-muted-foreground",
									"aria-live": "polite",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex size-2",
										"aria-hidden": true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-ping absolute inline-flex size-full rounded-full bg-primary opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-primary" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums font-medium text-foreground",
										children: [
											total,
											" ",
											total === 1 ? "vote" : "votes"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl leading-tight font-medium tracking-tight text-foreground sm:text-4xl",
								children: poll.question
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: votedLabel ? `You voted for ${votedLabel}. This phone is locked.` : "Pick one. Other phones see the bars move as they vote."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-4 rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
										children: "Share this poll"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-4xl tracking-[0.22em] text-foreground",
										"aria-label": `Poll code ${normalized.split("").join(" ")}`,
										children: normalized
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: "Send the link. Each phone opens it and votes once. Results stay in sync."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm break-all text-foreground",
								children: shareUrl || `/p/${normalized}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									className: "w-full sm:w-auto",
									onClick: () => void share(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									className: "w-full sm:w-auto",
									onClick: () => void copyLink(),
									children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Link copied" : "Copy link"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "radiogroup",
						"aria-label": "Poll choices",
						className: "flex flex-col gap-2.5",
						children: poll.options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, {
							option,
							index,
							percent: percents[index] ?? 0,
							total,
							selected: poll.myOptionId === option.id,
							disabled: Boolean(poll.myOptionId) || busy,
							leading: uniqueLead === option.id,
							onVote: (id) => void vote(id)
						}, option.id))
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						role: "alert",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: isHost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							className: "w-full sm:w-auto",
							onClick: () => setConfirmReset(true),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset votes"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Only the phone that started this poll can clear the votes."
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmReset,
				onOpenChange: setConfirmReset,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Reset this poll?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Every phone’s vote is cleared. People can choose again." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep going" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: (event) => {
						event.preventDefault();
						reset();
					},
					children: "Reset votes"
				})] })] })
			})
		]
	});
}
function RoomPage() {
	const { code } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PollRoom, { code });
}
//#endregion
export { RoomPage as component };
