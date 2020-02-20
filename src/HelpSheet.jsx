import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaClipboard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// eslint-disable-next-line import/no-extraneous-dependencies
const { clipboard } = require('electron');

const { toast } = require('./util');

const HelpSheet = ({
  visible, onTogglePress, renderSettings, ffmpegCommandLog, sortedCutSegments,
  formatTimecode,
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="help-sheet"
      >
        <IoIosCloseCircleOutline role="button" onClick={onTogglePress} size={30} style={{ position: 'fixed', right: 0, top: 0, padding: 20 }} />

        <h1>Keyboard shortcuts</h1>
        <ul>
          <li><kbd>H</kbd> Show/hide this screen</li>
          <li><kbd>SPACE</kbd>, <kbd>k</kbd> Play/pause</li>
          <li><kbd>J</kbd> Slow down video</li>
          <li><kbd>L</kbd> Speed up video</li>
          <li><kbd>←</kbd> Seek backward 1 sec</li>
          <li><kbd>→</kbd> Seek forward 1 sec</li>
          <li><kbd>.</kbd> (period) Tiny seek forward (1/60 sec)</li>
          <li><kbd>,</kbd> (comma) Tiny seek backward (1/60 sec)</li>
          <li><kbd>I</kbd> Mark in / cut start point</li>
          <li><kbd>O</kbd> Mark out / cut end point</li>
          <li><kbd>E</kbd> Cut (export selection in the same directory)</li>
          <li><kbd>C</kbd> Capture snapshot (in the same directory)</li>
          <li><kbd>+</kbd> Add cut segment</li>
          <li><kbd>D</kbd> Delete source file</li>
          <li><kbd>BACKSPACE</kbd> Remove current cut segment</li>
        </ul>

        <p style={{ fontWeight: 'bold' }}>Hover mouse over buttons to see which function they have.</p>

        <table style={{ marginTop: 40 }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th>Settings</th>
              <th>Current setting</th>
            </tr>
          </thead>
          <tbody>
            {renderSettings()}
          </tbody>
        </table>

        <h1 style={{ marginTop: 40 }}>Segment list</h1>
        <div style={{ overflowY: 'scroll', height: 200 }}>
          {sortedCutSegments.map((seg) => (
            <div key={seg.uuid} style={{ margin: '5px 0' }}>
              {formatTimecode(seg.start)} - {formatTimecode(seg.end)} {seg.name}
            </div>
          ))}
        </div>

        <h1 style={{ marginTop: 40 }}>Last ffmpeg commands</h1>
        <div style={{ overflowY: 'scroll', height: 200 }}>
          {ffmpegCommandLog.reverse().map((log) => (
            <div key={log} style={{ whiteSpace: 'pre', margin: '5px 0' }}>
              <FaClipboard style={{ cursor: 'pointer' }} title="Copy to clipboard" onClick={() => { clipboard.writeText(log); toast.fire({ timer: 2000, icon: 'success', title: 'Copied to clipboard' }); }} /> {log}
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default HelpSheet;
