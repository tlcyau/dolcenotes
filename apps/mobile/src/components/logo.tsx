import { StyleSheet, View } from "react-native"
import type { StyleProp, ViewStyle } from "react-native"
import Svg, { Path } from "react-native-svg"

import { Text } from "@/components/ui/text"
import { useColors } from "@/lib/theme"

// U+1D11E treble clef outline from Noto Music (SIL OFL 1.1), cropped to the
// glyph bounds. The swirl wraps the G line at y=1084 of the 1732-unit height.
const CLEF_PATH =
  "M264 533Q250 480 241 428Q232 376 232 322Q232 275 238 234Q245 192 257 157Q270 117 291 82Q312 46 336 23Q359 0 377 0Q401 0 443 85Q464 128 474 178Q484 228 484 285Q484 356 465 426Q446 497 410 559Q373 621 322 668L357 836Q372 834 382 833Q392 832 397 832Q458 832 506 866Q554 901 582 957Q611 1013 611 1080Q611 1157 572 1218Q532 1280 453 1309Q458 1326 482 1451Q488 1481 491 1498Q494 1516 495 1529Q496 1542 496 1559Q496 1609 472 1648Q447 1688 406 1710Q364 1732 313 1732Q261 1732 221 1712Q181 1693 158 1658Q135 1624 135 1579Q135 1531 162 1499Q188 1467 237 1467Q279 1467 306 1498Q332 1528 332 1570Q332 1606 307 1633Q282 1660 242 1660H232Q258 1699 314 1699Q383 1699 422 1654Q461 1609 461 1539Q461 1522 457 1494Q453 1465 443 1425Q433 1385 428 1359Q422 1333 420 1322Q386 1332 340 1332Q254 1332 172 1282Q92 1232 46 1150Q0 1068 0 973Q0 883 41 804Q82 725 142 659Q203 593 264 533ZM291 508Q314 496 340 464Q366 431 390 389Q414 347 429 304Q444 262 444 228Q444 192 433 171Q422 150 395 150Q371 150 348 172Q326 194 308 230Q291 267 281 312Q271 357 271 404Q271 436 278 462Q284 488 291 508ZM348 955Q321 961 297 980Q273 1000 258 1028Q244 1055 244 1086Q244 1111 257 1138Q270 1164 289 1180Q302 1192 315 1198Q330 1205 330 1211Q330 1214 320 1217Q282 1208 252 1183Q221 1158 204 1122Q186 1087 186 1047Q186 1004 204 964Q221 924 252 892Q284 860 324 844L295 693Q179 787 124 878Q70 968 70 1057Q70 1122 104 1178Q138 1234 197 1268Q256 1303 330 1303Q350 1303 370 1299Q391 1295 414 1289ZM445 1279Q543 1237 543 1107Q543 1064 521 1028Q499 993 462 972Q425 951 379 951Z"

// Instrument Sans metrics, in em: ascent 0.97 and descent 0.25 (hhea), and
// x-height 0.51.
const ASCENT = 0.97
const DESCENT = 0.25
const X_HEIGHT = 0.51
// The G line sits (1732 - 1084) / 1732 * 2em ≈ 1.252em below the clef's top.
const G_LINE = (1084 / 1732) * 2

/**
 * The "dolcenotes" wordmark, with a treble clef standing in for the "d".
 * The clef is 2em tall and the lowercase letters are centred on its swirl.
 */
export function Logo({
  size = 20,
  style,
}: {
  /** Font size of the lettering, in points. */
  size?: number
  style?: StyleProp<ViewStyle>
}) {
  const colors = useColors()
  const clefHeight = size * 2

  return (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel="dolcenotes"
      style={[styles.logo, style]}
    >
      <Svg
        width={(clefHeight * 611) / 1732}
        height={clefHeight}
        viewBox="0 0 611 1732"
      >
        <Path d={CLEF_PATH} fill={colors.foreground} />
      </Svg>
      <Text
        weight="medium"
        style={{
          fontSize: size,
          // The font's natural line box, so the baseline sits ASCENT down.
          lineHeight: (ASCENT + DESCENT) * size,
          // Drop the text so its x-height is centred on the G line.
          marginTop: (G_LINE - (ASCENT - X_HEIGHT / 2)) * size,
          includeFontPadding: false,
        }}
      >
        olcenotes
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: { flexDirection: "row", alignItems: "flex-start" },
})
