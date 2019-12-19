<div id="DEBUG_DIV" class="noSelect hidden">
	<!-- DEBUG NAVIGATION -->
	<div id="DEBUG_DIV_MENU">
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_1',this);">CORE</div>
		<div class="active debugPanelButtons" onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_2',this);">VID TESTS</div>
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_3',this);">GAME VARS</div>
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_4',this);">GAME FUNCS</div>
		<div class="debugPanelButtons"        onclick="game.DEBUG.NAV.debug_showPanel('DEBUG_MENU_DIV_5',this);">SOUND</div>

	</div>

	<table class="debugTable1">
		<!-- <caption>AVG TIMINGS</caption> -->
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
				<td> <span id="avg_LOGIC" >0.00%</span> </td>
				<td> <span id="avg_BG"    >0.00%</span> </td>
				<td> <span id="avg_SPRITE">0.00%</span> </td>
				<td> <span id="avg_TEXT"  >0.00%</span> </td>
				<td> <span id="avg_FADE"  >0.00%</span> </td>
				<td> <span id="avg_OUTPUT">0.00%</span> </td>
				<td> <span id="avg_TOTAL" >0.00%</span> </td>
			</tr>
		</tbody>
	</table>

	<!-- <br> -->

	<div id="DEBUG_DIV_MENU_DIVS">

		<div id="DEBUG_MENU_DIV_1" class="DEBUG_DIV_MENU_DIVS">
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
							<button onclick="game.game_full_restart();">WHOLE GAME</button>
						</td>
					</tr>
				</tbody>
			</table>

			<br>
			<br>

		</div>

		<div id="DEBUG_MENU_DIV_2" class="DEBUG_DIV_MENU_DIVS active">
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
						<td>FADE TESTS</td>
						<td>
							<!-- NON-BLOCKING -- DON'T BLOCK LOGIC WHEN DONE -->
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeIn (3, false, false);">FadeIn (3, false, false)</button>
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeOut(3, false, false);">FadeOut(3, false, false)</button>
							<br>

							<!-- BLOCKING -- DON'T BLOCK LOGIC WHEN DONE -->
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeIn (3, true, false);">FadeIn (3, true, false)</button>
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeOut(3, true, false);">FadeOut(3, true, false)</button>
							<br>

							<!-- NON-BLOCKING -- BLOCK LOGIC WHEN DONE -->
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeIn (3, false, true);">FadeIn (3, false, true)</button>
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeOut(3, false, true);">FadeOut(3, false, true)</button>
							<br>

							<!-- BLOCKING -- BLOCK LOGIC WHEN DONE -->
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeIn (3, true, true);">FadeIn (3, true, true)</button>
							<button onclick="core.GRAPHICS.FADER.FUNCS.FadeOut(3, true, true);">FadeOut(3, true, true)</button>
							<br>

							<!-- OVERRIDE LOGIC BLOCK -->
							<button onclick="core.GRAPHICS.FADER.FUNCS.blockLogic(false);">blockLogic(false)</button>
							<button onclick="core.GRAPHICS.FADER.FUNCS.blockLogic(true);" >blockLogic(true)</button>
							<br>

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
							<div id="debug_layerDrawDiv">-----</div>
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

					<tr>
						<td>DRAW FLAGS</td>
						<td>
							<button onclick="core.GRAPHICS.flags.BG    =true;game.DEBUG.drawFlagsToConsole();">BG    =true</button>
							<button onclick="core.GRAPHICS.flags.SPRITE=true;game.DEBUG.drawFlagsToConsole();">SPRITE=true</button>
							<button onclick="core.GRAPHICS.flags.TEXT  =true;game.DEBUG.drawFlagsToConsole();">TEXT  =true</button>
							<button onclick="core.GRAPHICS.flags.FADE  =true;game.DEBUG.drawFlagsToConsole();">FADE  =true</button>
							<button onclick="core.GRAPHICS.flags.OUTPUT=true;game.DEBUG.drawFlagsToConsole();">OUTPUT=true</button>
						</td>
					</tr>

					<tr>
						<td>DISP FLAGS</td>
						<td>
							<button onclick="game.DEBUG.drawFlagsToConsole();">DISP #1</button>
							<button onclick="game.DEBUG.fadeValuesToConsole();">DISP #2</button>

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
				<!-- <caption>Set Next Piece</caption> -->
				<thead>
					<tr>
						<th>Set J</th>
						<th>Set T</th>
						<th>Set Z</th>
						<th>Set O</th>
						<th>Set S</th>
						<th>Set L</th>
						<th>Set I</th>
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

		<div id="DEBUG_MENU_DIV_5" class="DEBUG_DIV_MENU_DIVS">

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
							<button onclick="core.FUNCS.audio.resume_midi('BGM1');">R M1</button>
							<button onclick="core.FUNCS.audio.resume_midi('BGM2');">R M2</button>
							<button onclick="core.FUNCS.audio.resume_midi('SFX1');">R S1</button>
							<button onclick="core.FUNCS.audio.resume_midi('SFX2');">R S1</button>
							<button onclick="core.FUNCS.audio.resume_midi('SFX3');">R S3</button>
							<button onclick="core.FUNCS.audio.resume_midi('SFX4');">R S4</button>
						</td>
					</tr>

					<tr>
						<td>PAUSE</td>
						<td>
							<button onclick="core.FUNCS.audio.stop_midi ('BGM1', false);">P M1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('BGM2', false);">P M2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX1', false);">P S1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX2', false);">P S2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX3', false);">P S3</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX4', false);">P S4</button>
							<button onclick="core.FUNCS.audio.stopAllSounds_midi(false);">ALL</button>
						</td>
					</tr>

					<tr>
						<td>STOP</td>
						<td>
							<button onclick="core.FUNCS.audio.stop_midi ('BGM1', true);">S M1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('BGM2', true);">S M2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX1', true);">S S1</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX2', true);">S S2</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX3', true);">S S3</button>
							<button onclick="core.FUNCS.audio.stop_midi ('SFX4', true);">S S4</button>
							<button onclick="core.FUNCS.audio.stopAllSounds_midi(true);">ALL</button>
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