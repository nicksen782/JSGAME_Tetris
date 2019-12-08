<div id="DEBUG_DIV" class="noSelect hidden">
	<!-- DEBUG NAVIGATION -->
	<div id="DEBUG_DIV_MENU">
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_1',this);">CORE</div>
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_2',this);">VID TESTS</div>
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_3',this);">GAME VARS</div>
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_4',this);">GAME FUNCS</div>
		<div class="active debugPanelButtons" onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_5',this);">SOUND</div>

	</div>

	<table class="debugTable1">
		<caption>AVG TIMINGS</caption>
		<thead>
			<tr>
				<th>LOGIC</th>
				<th>BG</th>
				<th>SPR</th>
				<th>TXT</th>
				<th>FADE</th>
				<th>OUT</th>
				<th>*TOTAL*</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td> <span id="avg_LOGIC"></span>  </td>
				<td> <span id="avg_BG"></span>     </td>
				<td> <span id="avg_SPRITE"></span> </td>
				<td> <span id="avg_TEXT"></span>   </td>
				<td> <span id="avg_FADE"></span>   </td>
				<td> <span id="avg_OUTPUT"></span> </td>
				<td> <span id="avg_TOTAL"></span>  </td>
			</tr>
		</tbody>
	</table>

	<br>

	<div id="DEBUG_DIV_MENU_DIVS">

		<div id="DEBUG_MENU_DIV_1" class="DEBUG_DIV_MENU_DIVS ">
			<table class="debugTable2">
				<caption>Test functions</caption>
				<thead>
					<tr>
						<th>TEST</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>RESTARTS</td>
						<td>
							<button title="restartGamestate"  id="restartGamestate">GAMESTATE</button>
							<!-- <button title="restartGame"       id="restartGame"     >GAME</button> -->
						</td>
					</tr>
				</tbody>
			</table>

			<br>
			<br>

		</div>

		<div id="DEBUG_MENU_DIV_2" class="DEBUG_DIV_MENU_DIVS ">
			<table class="debugTable2">
				<caption>Test functions</caption>
				<thead>
					<tr>
						<th>TEST</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>VRAM1 T1</td>
						<td>
							<button title="vram1_test1_on"  id="vram1_test1_on" >ON</button>
							<button title="vram1_test1_off" id="vram1_test1_off">OFF</button>
						</td>
					</tr>
					<tr>
						<td>VRAM2 T1</td>
						<td>
							<button title="vram2_test1_on"  id="vram2_test1_on" >ON</button>
							<button title="vram2_test1_off" id="vram2_test1_off">OFF</button>
						</td>
					</tr>
					<tr>
						<td>SPRITE T1</td>
						<td>
							<button title="sprite_test1_on"  id="sprite_test1_on" >ON</button>
							<button title="sprite_test1_off" id="sprite_test1_off">OFF</button>
						</td>
					</tr>
					<tr>
						<td>SPRITE T2</td>
						<td>
							<button title="sprite_test2_on"  id="sprite_test2_on" >ON</button>
							<button title="sprite_test2_off" id="sprite_test2_off">OFF</button>
						</td>
					</tr>
					<tr>
						<td>FADE TEST</td>
						<td>
							<button title="debug_fadeIn"  id="debug_fadeIn" >In&nbsp;</button>
							<button title="debug_fadeOut" id="debug_fadeOut">Out</button>
						</td>
					</tr>
					<tr>
						<td>FONT CHANGE</td>
						<td>
							<div id="debug_fontChangeDiv"></div>
						</td>
					</tr>
					<tr>
						<td>LAYER DISP</td>
						<td>
							<div id="debug_layerDrawDiv"></div>
						</td>
					</tr>
					<tr>
						<td>CLEARS</td>
						<td>
							<button title="debug_ClearVram1" id="debug_ClearVram1">VRAM1</button>
							<button title="debug_ClearVram2" id="debug_ClearVram2">VRAM2</button>
							<button title="debug_ClearSprites" id="debug_ClearSprites">SPRITES</button>
						</td>
					</tr>
				</tbody>
			</table>
			<br>
			<br>
		</div>
		<div id="DEBUG_MENU_DIV_3" class="DEBUG_DIV_MENU_DIVS">
			<textarea contenteditable="false" spellcheck="false" readonly id="debug_gameVars"></textarea>
			<br>

			<!-- <br> -->
			<!-- <br> -->

		</div>

		<div id="DEBUG_MENU_DIV_4" class="DEBUG_DIV_MENU_DIVS">
			<table class="debugTable1">
				<caption>Set Next Piece</caption>
				<thead>
					<tr>
						<th>J</th>
						<th>T</th>
						<th>Z</th>
						<th>O</th>
						<th>S</th>
						<th>L</th>
						<th>I</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='J'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/J.png');">  </button> </td>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='T'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/T.png');">  </button> </td>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='Z'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/Z.png');">  </button> </td>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='O'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/O.png');">  </button> </td>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='S'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/S.png');">  </button> </td>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='L'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/L.png');">  </button> </td>
						<td> <button onclick="game.gs['PLAY_A'].vars.nextPiece='I'; game.gs['PLAY_A'].updateNextPiece();" style="display: inline-block;width: 64px;height: 32px;background-position: center;background-repeat: no-repeat;background-size: contain;background-image:url('../JS_GAMES/Tetris/DEBUG/I.png');">  </button> </td>
					</tr>
				</tbody>
			</table>
			<br>

			<!-- <button onclick="game.gs['PLAY_A'].setNextDropSpeed('UP');">Dropspeed UP</button> -->
			<!-- <button onclick="game.gs['PLAY_A'].setNextDropSpeed('DOWN');">Dropspeed DOWN</button> -->
			<button onclick="game.gs['PLAY_A'].clearBoard();">Clear Board</button>
			<button onclick="game.gs['PLAY_A'].setDropSpeed(0);">Dropspeed 0</button>
			<button onclick="game.gs['PLAY_A'].setDropSpeed(10);">Dropspeed 10</button>
			<br>

			<button onclick="game.DEBUG.bottomLines();">bottomLines</button>
			<button onclick="game.gs['PLAY_A'].detectCompletedLines();">detectCompletedLines</button>
			<button onclick="game.DEBUG.showVramInConsole();">showVramInConsole</button>
			<br>

			<button onclick="game.DEBUG.showCoords('white');">Show Coords(white)</button>
			<button onclick="game.DEBUG.showCoords('black');">Show Coords(black)</button>
			<button onclick="game.DEBUG.hideCoords();">Hide Coords</button>

			<br>
			<br>

		</div>

		<div id="DEBUG_MENU_DIV_5" class="DEBUG_DIV_MENU_DIVS active">

			<table class="debugTable2">
				<caption>MIDI</caption>
				<thead>
					<tr>
						<th>DESC</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>RESUME</td>
						<td>
							<button onclick="core.FUNCS.audio.resume_midi('music1');">R M1</button>
							<button onclick="core.FUNCS.audio.resume_midi('music2');">R M2</button>
							<button onclick="core.FUNCS.audio.resume_midi('sound1');">R S1</button>
							<button onclick="core.FUNCS.audio.resume_midi('sound2');">R S1</button>
							<button onclick="core.FUNCS.audio.resume_midi('sound3');">R S3</button>
							<button onclick="core.FUNCS.audio.resume_midi('sound4');">R S4</button>
						</td>
					</tr>

					<tr>
						<td>PAUSE</td>
						<td>
							<button onclick="core.FUNCS.audio.stop_midi ('music1', false);">P M1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('music2', false);">P M2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound1', false);">P S1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound2', false);">P S2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound3', false);">P S3</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound4', false);">P S4</button>
						</td>
					</tr>

					<tr>
						<td>STOP</td>
						<td>
							<button onclick="core.FUNCS.audio.stop_midi ('music1', true);">S M1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('music2', true);">S M2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound1', true);">S S1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound2', true);">S S2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound3', true);">S S3</button>
							<button onclick="core.FUNCS.audio.stop_midi ('sound4', true);">S S4</button>
						</td>
					</tr>
					<tr>
						<td>PAUSE ALL MIDI</td>
						<td>
							<button onclick="core.FUNCS.audio.stopAllSounds_midi(false);">Pause</button>
						</td>
					</tr>
					<tr>
						<td>STOP ALL MIDI</td>
						<td>
							<button onclick="core.FUNCS.audio.stopAllSounds_midi(true);">Stop</button>
						</td>
					</tr>
					<tr>
						<td>RESUME ALL MIDI</td>
						<td>
							<button onclick="core.FUNCS.audio.stopAllSounds_midi(true);">Stop</button>
						</td>
					</tr>

					<!-- REMAINING ROWS WILL BE POPULATED BY JAVASCRIPT -->

				</tbody>
			</table>

			<br>

			<table class="debugTable2" id="debugSounds">
				<caption>Sound Test 2</caption>
				<thead>
					<tr>
						<th>DESC</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>

		</div>

	</div>

</div>