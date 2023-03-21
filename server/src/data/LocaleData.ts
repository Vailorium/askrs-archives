import { Dictionary } from '../models/Generics';
import _locale_EUDE from './locales/locale_EUDE.json';
import _locale_EUEN from './locales/locale_EUEN.json';
import _locale_EUES from './locales/locale_EUES.json';
import _locale_EUFR from './locales/locale_EUFR.json';
import _locale_EUIT from './locales/locale_EUIT.json';
import _locale_JPJA from './locales/locale_JPJA.json';
import _locale_TWZH from './locales/locale_TWZH.json';
import _locale_USEN from './locales/locale_USEN.json';
import _locale_USES from './locales/locale_USES.json';
import _locale_USPT from './locales/locale_USPT.json';

const locales: Dictionary<Dictionary<string | null>> = {
  EUDE: _locale_EUDE as Dictionary<string | null>,
  EUEN: _locale_EUEN as Dictionary<string | null>,
  EUES: _locale_EUES as Dictionary<string | null>,
  EUFR: _locale_EUFR as Dictionary<string | null>,
  EUIT: _locale_EUIT as Dictionary<string | null>,
  JPJA: _locale_JPJA as Dictionary<string | null>,
  TWZH: _locale_TWZH as Dictionary<string | null>,
  USEN: _locale_USEN as Dictionary<string | null>,
  USES: _locale_USES as Dictionary<string | null>,
  USPT: _locale_USPT as Dictionary<string | null>,
};
export default locales;
