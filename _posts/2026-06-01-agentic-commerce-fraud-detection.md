---
title: "Assessing the impact of Agentic Commerce on issuer fraud detection and data integrity"
subtitle: "Agentic Commerce represents a structural shift that challenges the trust architecture of digital payments"
date: 2026-06-01
category: research
tags: [agentic commerce, payments, card payments, acquiring, issuing]
---

**TL;DR**:
- Agentic Commerce aims to replace customer shopping interactions with AI agents. These agents mechanically remove may of the behavioural signals that card issuers relied on for fraud detection
- Payment stakeholders created new protocols to strengthen transaction security in the context of Agentic Commerce. However, these protocols are tied to agent trust and do not replace the loss of behavioural signals, thus creating greater uncertainty
- When faced with higher uncertainty, bank issuers naturally default to a more conservatise posture in order to control fraud rates. Without a complete overhaul of current fraud models, merchants should expect higher rates of false-positive declines in agentic transactions

## The emergence of frictionless shopping and signal-less transactions

"Dear agent, whenever you can find me a pair of raccoon fur boots under $200, buy them immediately. I need to prepare for winter."

Isn't it a wonderful world in which our personal assistant can anticipate our needs and handle our purchases without us ever having to visit a shopping website, open a cart, or go through a payment page? This is the promise behind Agentic Commerce and the reason why every major stakeholder in the payments industry is obsessed with this technology.

What receives far less public attention, though, is how card issuers will lose most of the behavioural signals currently attached to a payment attempt: the IP address you connect from, the characteristics of your browser, your time zone and language settings, etc. All of those disappear once the transaction is initiated by a remote AI agent. Yet, these data points are precisely the variables card issuers use to decide whether a transaction should be authorised or declined on suspicion of fraud.

![So you figured out fraud detection, right?](/assets/images/2026-05-10-cli-agentic-design/agentic-commerce-fraud.webp)

## The shift from behavioural monitoring to protocol trust

Needless to say, the payments industry began developing new mechanisms aimed at strengthening transaction security. We do not want your agent to purchase a warehouse full of raccoon fur boots when you only asked for a pair, right?

Hence the emergence of cryptographic intent (what does the user want?), Know Your Agent (who is this AI?), and tokenised credentials (which payment credential the agent is authorised to use?). These protocols are a necessary adaptation to the new agentic reality, but they only focus on establishing trust in the agent. What happens, however, if the underlying account has been compromised? Perhaps we trust Anthropic or OpenAI, but what if I decide to self-host my agent with an open-source model?

## Without proper issuer adjustment, risk models will be left in the dark

Issuing banks will find themselves in a tough position where greater uncertainty is almost inevitable. And when uncertainty rises, there are only two options: either you become more conservative and decline more transactions, or you become more permissive and mechanically authorise more fraudulent transactions.

Current issuer fraud models are primarily optimised to minimise fraud, and not maximising merchant conversion at all costs. In this context, without significant adjustments or entirely new fraud models, the most likely outcome is an increase in false-positive declines for merchants.

Hence a beautiful paradox: the front-end experience will become frictionless while the payment back end is bound to be burdened with significantly more false-positive declines.

### Sources

Haroune, Camil (2026, June 1). Assessing the impact of agentic commerce on issuer fraud detection and data integrity. In the Journal of Payments Strategy & Systems, Volume 20, Issue 2. https://doi.org/10.69554/AZQZ2883.