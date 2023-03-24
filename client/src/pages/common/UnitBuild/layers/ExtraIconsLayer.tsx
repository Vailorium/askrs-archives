/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// Legendary/Mythic Icons, Duo/Mythic/Ascended Icons, Ascended Floret Icon
import React, { useRef, useEffect } from 'react';
import { Element, IVS, Kind } from '../../../../enums';
import { Legendary } from '../../../../models';
import CanvasHelper from '../../../../services/CanvasHelper';
import HeroData from '../../../../services/HeroData';

interface ExtraIconsLayerProps {
  blessing: Element;
  legendary: Legendary | null;
  IVS: { boon: IVS, bane: IVS, floret: IVS }
}
function ExtraIconsLayer(props: ExtraIconsLayerProps) {
  // legendary > blessing priority
  // Create icon helper for legendary icon (with stats?)
  // Need icon for asc heroes
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { blessing, legendary, IVS } = props;

  const draw = async () => {
    // Legendary/Mythic/Blessed Icon
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const { blessing, legendary, IVS } = props;
        if (legendary && legendary.kind === Kind.blessed) {
          // print legendary
          let legendaryIcon = `${process.env.REACT_APP_CDN_URL}/assets/UI/blessing/Icon_Legend${HeroData.getLegendaryElementString(legendary)}`;

          if (legendary.bonus_effect.atk > 0) {
            legendaryIcon += 'Atk';
          } else if (legendary.bonus_effect.spd > 0) {
            legendaryIcon += 'Spd';
          } else if (legendary.bonus_effect.def > 0) {
            legendaryIcon += 'Def';
          } else if (legendary.bonus_effect.res) {
            legendaryIcon += 'Res';
          }

          if (legendary.ae_extra) {
            legendaryIcon += '_02';
          } else if (legendary.pair_up) {
            legendaryIcon += '_03';
          }

          legendaryIcon += '.webp';

          ctx.drawImage(
            // store in const variable, loaded at start of app
            await CanvasHelper.loadImage(legendaryIcon),
            0,
            0,
            220,
            240,
            420,
            420,
            82.5,
            90,
          );
        } else if (blessing !== Element.none) {
          // print blessing
        }

        // if (legendary) {
        //   switch(legendary.kind) {
        //     case Kind.duo:
        //       break;
        //     case Kind.harmonic:
        //       break;
        //     case Kind.ascended:
        //       break;
        //     case Kind.rearmed:
        //       break;
        //   }
        // }

        // if(IVS.floret) {

        // }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 900;
      canvas.style.width = '500px';
      canvas.style.height = '900px';

      draw();
    }
  }, [blessing, legendary, IVS]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: 6,
      }}
    />
  );
}
export default ExtraIconsLayer;
