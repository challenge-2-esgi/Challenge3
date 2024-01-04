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
    return ThemeData(
      useMaterial3: true,
      extensions: [_colors],
      textButtonTheme: const TextButtonThemeData(
        style: ButtonStyle(
          shape: MaterialStatePropertyAll(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(8),
              ),
            ),
          ),
        ),
      ),
      elevatedButtonTheme: const ElevatedButtonThemeData(
        style: ButtonStyle(
          backgroundColor: MaterialStatePropertyAll(AppColors.primary),
          shape: MaterialStatePropertyAll(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(8),
              ),
            ),
          ),
          padding: MaterialStatePropertyAll(
            EdgeInsets.symmetric(horizontal: 28, vertical: 15),
          ),
          foregroundColor: MaterialStatePropertyAll(Colors.white),
        ),
      ),
      inputDecorationTheme: const InputDecorationTheme(
        contentPadding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 15.0),
        floatingLabelBehavior: FloatingLabelBehavior.always,
        floatingLabelStyle: TextStyle(
          color: AppColors.primary,
        ),
        labelStyle: TextStyle(
          color: AppColors.body,
        ),
        hintStyle: TextStyle(
          color: AppColors.bodyDark,
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: AppColors.body,
            style: BorderStyle.solid,
            width: 1,
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(8.0),
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: AppColors.primary),
          borderRadius: BorderRadius.all(
            Radius.circular(8.0),
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: AppColors.danger,
            style: BorderStyle.solid,
            width: 1,
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(8.0),
          ),
        ),
        errorStyle: TextStyle(
          color: AppColors.danger,
        ),
        suffixIconColor: AppColors.body,
      ),
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
