#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-duel-102324-03b75a89/tic_tac_toe_duel
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

