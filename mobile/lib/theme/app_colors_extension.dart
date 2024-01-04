import 'package:flutter/material.dart';

class AppColorsExtension extends ThemeExtension<AppColorsExtension> {
  final Color? white;
  final Color? black;
  final Color? black2;
  final Color? body;
  final Color? bodyDark;
  final Color? bodyDark1;
  final Color? bodyDark2;
  final Color? primary;
  final Color? secondary;
  final Color? stroke;
  final Color? gray;
  final Color? grayDark;
  final Color? gray2;
  final Color? gray3;
  final Color? whiten;
  final Color? whiter;
  final Color? boxDark;
  final Color? boxDark2;
  final Color? strokeDark;
  final Color? formStrokeDark;
  final Color? formInput;
  final Color? meta1;
  final Color? meta2;
  final Color? meta3;
  final Color? meta4;
  final Color? meta5;
  final Color? meta6;
  final Color? meta7;
  final Color? meta8;
  final Color? meta9;
  final Color? success;
  final Color? danger;
  final Color? warning;

  AppColorsExtension({
    required this.white,
    required this.black,
    required this.black2,
    required this.body,
    required this.bodyDark,
    required this.bodyDark1,
    required this.bodyDark2,
    required this.primary,
    required this.secondary,
    required this.stroke,
    required this.gray,
    required this.grayDark,
    required this.gray2,
    required this.gray3,
    required this.whiten,
    required this.whiter,
    required this.boxDark,
    required this.boxDark2,
    required this.strokeDark,
    required this.formStrokeDark,
    required this.formInput,
    required this.meta1,
    required this.meta2,
    required this.meta3,
    required this.meta4,
    required this.meta5,
    required this.meta6,
    required this.meta7,
    required this.meta8,
    required this.meta9,
    required this.success,
    required this.danger,
    required this.warning,
  });

  @override
  ThemeExtension<AppColorsExtension> copyWith({
    Color? white,
    Color? black,
    Color? black2,
    Color? body,
    Color? bodyDark,
    Color? bodyDark1,
    Color? bodyDark2,
    Color? primary,
    Color? secondary,
    Color? stroke,
    Color? gray,
    Color? grayDark,
    Color? gray2,
    Color? gray3,
    Color? whiten,
    Color? whiter,
    Color? boxDark,
    Color? boxDark2,
    Color? strokeDark,
    Color? formStrokeDark,
    Color? formInput,
    Color? meta1,
    Color? meta2,
    Color? meta3,
    Color? meta4,
    Color? meta5,
    Color? meta6,
    Color? meta7,
    Color? meta8,
    Color? meta9,
    Color? success,
    Color? danger,
    Color? warning,
  }) {
    return AppColorsExtension(
      white: white ?? this.white,
      black: black ?? this.black,
      black2: black2 ?? this.black2,
      body: body ?? this.body,
      bodyDark: bodyDark ?? this.bodyDark,
      bodyDark1: bodyDark1 ?? this.bodyDark1,
      bodyDark2: bodyDark2 ?? this.bodyDark2,
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      stroke: stroke ?? this.stroke,
      gray: gray ?? this.gray,
      grayDark: grayDark ?? this.grayDark,
      gray2: gray2 ?? this.gray2,
      gray3: gray3 ?? this.gray3,
      whiten: whiten ?? this.whiten,
      whiter: whiter ?? this.whiter,
      boxDark: boxDark ?? this.boxDark,
      boxDark2: boxDark2 ?? this.boxDark2,
      strokeDark: strokeDark ?? this.strokeDark,
      formStrokeDark: formStrokeDark ?? this.formStrokeDark,
      formInput: formInput ?? this.formInput,
      meta1: meta1 ?? this.meta1,
      meta2: meta2 ?? this.meta2,
      meta3: meta3 ?? this.meta3,
      meta4: meta4 ?? this.meta4,
      meta5: meta5 ?? this.meta5,
      meta6: meta6 ?? this.meta6,
      meta7: meta7 ?? this.meta7,
      meta8: meta8 ?? this.meta8,
      meta9: meta9 ?? this.meta9,
      success: success ?? this.success,
      danger: danger ?? this.danger,
      warning: warning ?? this.warning,
    );
  }

  @override
  ThemeExtension<AppColorsExtension> lerp(
      covariant ThemeExtension<AppColorsExtension>? other, double t) {
    if (other is! AppColorsExtension) {
      return this;
    }

    return AppColorsExtension(
      white: Color.lerp(white, other.white, t),
      black: Color.lerp(black, other.black, t),
      black2: Color.lerp(black2, other.black2, t),
      body: Color.lerp(body, other.body, t),
      bodyDark: Color.lerp(bodyDark, other.bodyDark, t),
      bodyDark1: Color.lerp(bodyDark1, other.bodyDark1, t),
      bodyDark2: Color.lerp(bodyDark2, other.bodyDark2, t),
      primary: Color.lerp(primary, other.primary, t),
      secondary: Color.lerp(secondary, other.secondary, t),
      stroke: Color.lerp(stroke, other.stroke, t),
      gray: Color.lerp(gray, other.gray, t),
      grayDark: Color.lerp(grayDark, other.grayDark, t),
      gray2: Color.lerp(gray2, other.gray2, t),
      gray3: Color.lerp(gray3, other.gray3, t),
      whiten: Color.lerp(whiten, other.whiten, t),
      whiter: Color.lerp(whiter, other.whiter, t),
      boxDark: Color.lerp(boxDark, other.boxDark, t),
      boxDark2: Color.lerp(boxDark2, other.boxDark2, t),
      strokeDark: Color.lerp(strokeDark, other.strokeDark, t),
      formStrokeDark: Color.lerp(formStrokeDark, other.formStrokeDark, t),
      formInput: Color.lerp(formInput, other.formInput, t),
      meta1: Color.lerp(meta1, other.meta1, t),
      meta2: Color.lerp(meta2, other.meta2, t),
      meta3: Color.lerp(meta3, other.meta3, t),
      meta4: Color.lerp(meta4, other.meta4, t),
      meta5: Color.lerp(meta5, other.meta5, t),
      meta6: Color.lerp(meta6, other.meta6, t),
      meta7: Color.lerp(meta7, other.meta7, t),
      meta8: Color.lerp(meta8, other.meta8, t),
      meta9: Color.lerp(meta9, other.meta9, t),
      success: Color.lerp(success, other.success, t),
      danger: Color.lerp(danger, other.danger, t),
      warning: Color.lerp(warning, other.warning, t),
    );
  }
}
