import React from 'react';
import s from './diagrams.module.css';

// The three drawings of the post: one idea each, few words, large type.
// Inline SVG so they take the site's light / dark colours
// (diagrams.module.css) and can move a little.

function Figure({ label, caption, viewBox, children }) {
	return (
		<figure className={s.figure}>
			<svg viewBox={viewBox} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
				{children}
			</svg>
			{caption && <figcaption className={s.caption}>{caption}</figcaption>}
		</figure>
	);
}

function Head({ id, accent }) {
	return (
		<marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
			<path d="M0 0 L10 5 L0 10 z" className={accent ? s.headAccent : s.head} />
		</marker>
	);
}

// One workspace, several teams: each session sees the folders its user can see.
export function Folders() {
	const folders = [
		['f/ops', 'Stripe, Slack, ops skills'],
		['f/billing', 'Snowflake, invoices'],
		['f/hr', 'payroll, HR data'],
	];
	// [label, kind] per folder, for each team: kind is write | read | hidden.
	const teams = [
		['Ops', [['can write', 'write'], ['read-only', 'read'], ['does not exist', 'hidden']]],
		['Finance', [['does not exist', 'hidden'], ['can write', 'write'], ['does not exist', 'hidden']]],
	];
	const cell = { write: [s.boxFieldAccent, s.accent], read: [s.boxField, s.soft], hidden: [s.boxGhost, s.muted] };
	return (
		<Figure
			viewBox="0 0 720 270"
			label="One workspace with three folders: f/ops, f/billing and f/hr. The ops team's session can write in f/ops, only read f/billing, and f/hr does not exist for it. The finance team's session can write in f/billing, and f/ops and f/hr do not exist for it."
			caption="Same workspace, different views: a session only sees the folders its user can see."
		>
			<rect width="720" height="270" className={s.bg} />
			<text x="24" y="40" fontSize="15" fontWeight="700" className={`${s.sans} ${s.accentInk}`}>One workspace</text>
			{teams.map(([team], j) => (
				<text key={team} x={406 + j * 160} y="40" textAnchor="middle" fontSize="15" fontWeight="700" className={`${s.sans} ${s.ink}`}>{team} session</text>
			))}
			{folders.map(([path, what], i) => {
				const y = 62 + i * 66;
				return (
					<g key={path} className={s.sans}>
						<rect x="16" y={y} width="300" height="54" rx="10" className={s.box} />
						<text x="34" y={y + 24} fontSize="16" fontWeight="700" className={`${s.mono} ${s.ink}`}>{path}</text>
						<text x="34" y={y + 43} fontSize="13" className={s.muted}>{what}</text>
						{teams.map(([team, cells], j) => {
							const [label, kind] = cells[i];
							const [box, ink] = cell[kind];
							return (
								<g key={team}>
									<rect x={336 + j * 160} y={y + 7} width="140" height="40" rx="20" className={box} />
									<text x={406 + j * 160} y={y + 32} textAnchor="middle" fontSize="14" fontWeight={kind === 'write' ? 700 : 400} className={ink}>{label}</text>
								</g>
							);
						})}
					</g>
				);
			})}
		</Figure>
	);
}

// The two usual ways to production: dev → prod, or a fork per session before dev.
export function Deploy() {
	const rows = [
		['Simple', ['Dev workspace', 'Review', 'Prod workspace']],
		['Advanced', ['Fork', 'Review', 'Dev workspace', 'Review', 'Prod workspace']],
	];
	return (
		<Figure
			viewBox="0 0 720 230"
			label="Two setups. Simple: dev workspace, then review, then prod workspace. Advanced: a fork per session, then review, then dev workspace, then review, then prod workspace."
			caption="Every step toward production goes through a review."
		>
			<defs><Head id="dp-a" accent /></defs>
			<rect width="720" height="230" className={s.bg} />
			{rows.map(([name, steps], r) => {
				const y = 34 + r * 104;
				const w = 112, gap = 13, x0 = 106;
				return (
					<g key={name} className={s.sans}>
						<text x="16" y={y + 35} fontSize="14" fontWeight="700" className={s.muted}>{name}</text>
						{steps.map((step, i) => {
							const x = x0 + i * (w + gap);
							const review = step === 'Review';
							return (
								<g key={i}>
									<rect x={x} y={y + 6} width={w} height="48" rx="10" className={review ? s.boxFieldAccent : s.box} />
									<text x={x + w / 2} y={y + 36} textAnchor="middle" fontSize="13" fontWeight="700" className={review ? s.accent : s.ink}>{step}</text>
									{i < steps.length - 1 && (
										<line x1={x + w + 2} y1={y + 30} x2={x + w + gap - 3} y2={y + 30} className={`${s.lineAccent} ${s.flow}`} markerEnd="url(#dp-a)" />
									)}
								</g>
							);
						})}
					</g>
				);
			})}
		</Figure>
	);
}

// Engineers add Snowflake on Tuesday; Wednesday's session simply has it.
export function WorkspaceMoves() {
	return (
		<Figure
			viewBox="0 0 720 200"
			label="Monday, a finance session can use Postgres. On Tuesday, engineers add Snowflake. Wednesday, the next finance session can use Postgres and Snowflake, with nothing to set up."
			caption="The platform team changes the workspace once. The next session just has it."
		>
			<defs><Head id="hm-a" accent /></defs>
			<rect width="720" height="200" className={s.bg} />

			<g className={s.sans}>
				<rect x="16" y="40" width="250" height="124" rx="12" className={s.box} />
				<text x="36" y="72" fontSize="16" fontWeight="700" className={s.ink}>Monday's session</text>
				<rect x="36" y="94" width="112" height="40" rx="20" className={s.boxField} />
				<text x="92" y="120" textAnchor="middle" fontSize="15" className={s.soft}>Postgres</text>

				<text x="360" y="86" textAnchor="middle" fontSize="15" fontWeight="700" className={s.accent}>Tuesday</text>
				<text x="360" y="108" textAnchor="middle" fontSize="14" className={s.muted}>engineers add Snowflake</text>
				<line x1="290" y1="128" x2="430" y2="128" strokeWidth="2" className={`${s.lineAccent} ${s.flow}`} markerEnd="url(#hm-a)" />

				<rect x="454" y="40" width="250" height="124" rx="12" className={s.boxAccent} />
				<text x="474" y="72" fontSize="16" fontWeight="700" className={s.ink}>Wednesday's session</text>
				<rect x="474" y="94" width="112" height="40" rx="20" className={s.boxField} />
				<text x="530" y="120" textAnchor="middle" fontSize="15" className={s.soft}>Postgres</text>
				<g className={s.pop}>
					<rect x="594" y="94" width="100" height="40" rx="20" className={s.boxFieldSnow} />
					<text x="644" y="120" textAnchor="middle" fontSize="15" fontWeight="700" className={s.snow}>Snowflake</text>
				</g>
			</g>
		</Figure>
	);
}

// The tutorials of the series, embedded where the post talks about them.
// Lazy so a page with several videos only loads the ones being read.
export function Video({ id, title }) {
	return (
		<figure className={s.video}>
			<iframe
				src={`https://www.youtube.com/embed/${id}`}
				title={title}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			/>
			<figcaption className={s.caption}>{title}</figcaption>
		</figure>
	);
}
