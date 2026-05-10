---
title: "Why bother designing for humans? CLIs will be used by agents anyway"
subtitle: "If most programmatic tools will not be used by humans in the future, why keep designing them for humans?"
date: 2026-05-10
category: code
tags: [ai, agents, cli, cli-agent-lint]
---


**TL;DR**:
- It is inevitable that most developer tool use will soon be almost exclusively handled by AI agents
- When properly designed, CLIs appear as the preferred interface matching AI agent constraints
- Designing agent-ready CLIs therefore becomes an engineering discipline, not a side concern

> If most programmatic tools will not be used by humans in the future, why keep designing them for humans?

## I beg your pardon? You entered a coding competition against an AI?

There is certainly beauty in being a seasoned coding craftsman, employed in mastering the most obscure corners of the software world. Let's be serious for a second, though. So far, and I expect for quite some time, most web interactions happen in some sort of business environment. As a result, it happens that the dominant force behind most of these interactions is productivity and efficiency, all in hopes of superior gains. 

The only conclusion that one can draw from this is the sunsetting of software craftsmanship and the rise of agentic coding. Not really breaking news in May 2026. The second-order conclusion, though, has not fully landed: if most programmatic tools will not be used by humans, why keep designing them for humans?

![The age of the agent has come](/assets/images/2026-05-10-cli-agentic-design/agent-age.webp)

## CLIs outrageously win over MCPs in most contexts (pun intended)

MCPs seemed like the natural answer to this problem. New paradigm, new protocol, end of the story. What appears ironic, though, is that the traditional tool aimed at human use — CLIs — turns out, in retrospect, to be the better fit.

The largest constraint AI agents face is context length. As per Anthropic's blog: "Given that LLMs are constrained by a finite attention budget, good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome." 

If context blows up, you lose accuracy. And what happens when you use MCPs instead of traditional CLIs? Well, surprise, context blows up. And it makes sense: MCPs are all about full discoverability of an entire schema. The very thing they try to accomplish, improving agentic efficiency, may actually backfire and tank performance. Needless to say, this worsens severely when multiple MCPs are loaded in context in parallel.

Some great analyses of token use difference between MCPs and CLIs were recently made by Jannik Reinhard: simply loading the GitHub MCP burns 35k tokens, a single task on Intune gives the CLI a 35x edge (~4k tokens used with the CLI vs. ~145k with the MCP).

CLIs, on the other hand, do not suffer this issue as nothing is loaded in context by default. At worst, the AI discovers an unknown CLI with the --help flag and gets a concise view of the available commands.

Yes, MCP progressive discoverability narrows the gap — the Tool Search Tool, dynamic loading, and lazy schema fetching all help. But most MCP servers in the wild don't implement it, and even when they do, schema-first tooling carries structural overhead a CLI never has.

## CLIs simply need a good old check-list

Now that we have established CLIs as our champion, why not give them some protein and creatine to make their fur shinier? If CLIs are the go-to interface for AI agents, then they also need to be designed for those agents.

I will argue the most important factors when an agent interacts with a programmatic tool are:

- Can my agent learn this CLI from --help alone? Not all CLIs are as well embedded in the training weights as gh or docker. A well designed --help flag goes a long way
- Will this CLI blow my context window? CLIs do not actually need to write Shakespearean outputs to satisfy an agent. Let's keep it short
- Can my agent trust the output? Exit codes need to be reliable, outputs need to be deterministic
- Can my agent use this CLI without causing damage? Perhaps it would be interesting to think about what happens before destructive commands run. Right?
- Will this CLI block my agent? Interactivity is not great for agents, stderr/stdout are more boring but so much more efficient
In a nutshell, forget everything that makes a CLI beautiful to a human. Stop optimizing for humans. Optimize for the actual user.

You don't have to be an expert at CLI design. This is an engineering discipline that some [open source tools](https://github.com/Camil-H/cli-agent-lint) can help with.

Feel free to indulge!

```bash
go install github.com/Camil-H/cli-agent-lint@latest
cli-agent-lint check ./your-cli
```

### Sources

- [Anthropic's blog](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Jannik Reinhard's blog](https://jannikreinhard.com/2026/02/22/why-cli-tools-are-beating-mcp-for-ai-agents/)