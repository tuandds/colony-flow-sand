# 2. Core loop

## 2.1 Moment to moment <Badge type="tip" text="Live" />

1. **Read the nests.** The front row of nests (white outline) shows which colours the ants want now and how many blocks each still needs.
2. **Swipe the sand.** Sand under the finger comes loose. Loose sand falls, slides off slopes and drops out of the bottom of the board. Sand that is still fixed holds whatever rests on it.
3. **Watch it flow.** Falling sand lands in the funnel, slides down the walls and trickles into the hole. Every 64 grains of one colour become one block.
4. **Blocks ride the conveyor.** A finished block waits in the hole until an empty conveyor slot passes under it, then drops on.
5. **Ants deliver.** When a block of a front-row nest's colour is on the belt, an ant walks out, picks it up and carries it home. The nest's number counts down.
6. **Nests clear and the queue moves up.** A full nest pops; the next nest in that column slides up and becomes active.

The tension: the conveyor has 30 slots. Releasing a colour no front-row nest wants fills it up.

## 2.2 Session <Badge type="tip" text="Live" />

A level takes about 30 to 150 seconds. Win → *Next*. Lose (the conveyor is full and no block on it fits a nest) → *Retry*. The last level reached is remembered.

## 2.3 Long term <Badge type="warning" text="Coming soon" />

Boosters, coins and more levels are planned; see the [Roadmap](./roadmap).
