import 'package:flutter/material.dart';
import 'package:mobile/theme/app_colors.dart';
import 'package:mobile/theme/app_colors_extension.dart';

class AppTheme {
  static final themeData = _build();

  static final _colors = AppColorsExtension(
    white: AppColors.white,
    black: AppColors.black,
    black2: AppColors.black2,
    body: AppColors.body,
    bodyDark: AppColors.bodyDark,
    bodyDark1: AppColors.bodyDark1,
    bodyDark2: AppColors.bodyDark2,
    primary: AppColors.primary,
    secondary: AppColors.secondary,
    stroke: AppColors.stroke,
    gray: AppColors.gray,
    grayDark: AppColors.grayDark,
    gray2: AppColors.gray2,
    gray3: AppColors.gray3,
    whiten: AppColors.whiten,
    whiter: AppColors.whiter,
    boxDark: AppColors.boxDark,
    boxDark2: AppColors.boxDark2,
    strokeDark: AppColors.strokeDark,
    formStrokeDark: AppColors.formStrokeDark,
    formInput: AppColors.formInput,
    meta1: AppColors.meta1,
    meta2: AppColors.meta2,
    meta3: AppColors.meta3,
    meta4: AppColors.meta4,
    meta5: AppColors.meta5,
    meta6: AppColors.meta6,
    meta7: AppColors.meta7,
    meta8: AppColors.meta8,
    meta9: AppColors.meta9,
    success: AppColors.success,
    danger: AppColors.danger,
    warning: AppColors.warning,
  );

  static ThemeData _build() {
    final base = ThemeData.light();

    return base.copyWith(
      extensions: [_colors],
    );
  }
}

extension AppThemeExtension on ThemeData {
  AppColorsExtension get colors =>
      extension<AppColorsExtension>() ?? AppTheme._colors;
}

extension ThemeGetter on BuildContext {
  ThemeData get theme => Theme.of(this);
}
