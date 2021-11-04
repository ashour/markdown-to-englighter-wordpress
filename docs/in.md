# Building more Accessible Android applications with Internationalisation

Globally, there are more than 2.2 billion people with some kind of visual impairment. Making your app accessible opens your app to a plethora of these users. Adding internationalisation with accessibility will help you to reach visually impaired users for whom your app's hardcoded language might act as a limitation.

## Android Accessibility Services

Android accessibility services requires devices with Android 6 (M) and above. This includes services such as Talkback, Accessibility Menu , Select to Speak, Switch Access and CallApp. For this tutorial we will focus on the Talkback service. Most original equipment manufacturers(OEMs) will have these services installed by default but for some phones you will have to download it manually from the [Play Store](https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback&hl=en_IN&gl=US). To activate the Talkback service, go to phone's Settings > Accessibility > Talkback and turn it on .

Note: You can also enable/disable Talkback via adb by using the following commands.

```
@file:path/to/my/file.ext
// disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

// enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

## What is Talkback?

Talkback with the help of its intelligent gestures, helps users navigate and interact with the screen without actually looking at the screen. It _talks back_ to the user telling all the appropriate information that the user might need from the app, thereby making android applications accessible to visually impaired people. In this article, we will discuss ways to make Talkback service announce localized text, so that we provide accessible apps to a global audience.

## Navigation with Talkback within a Screen

User can browse the screen by swiping from left to right. As the user swipes on the screen, talkback announces the items on the screen. When the user swipes from up to down, Talkback focuses on that element and suggests actions related to that element.

https://drive.google.com/file/d/1VfgIj8EXjjDiQbDUnNjuIk705u4a-aZC/view?usp=sharing

Talkback also offers support for RTL layouts, the touch gestures become inverted as you can see in the video below.

https://drive.google.com/file/d/1d4nFHFA5SLD20w2CH8urWHa68f-IhXjr/view?usp=sharing

### Remove Hardcoded Strings

Talkback automatically picks up the language set on the Android OS and communicates with the user using the same language. If you use hard-coded strings in your app, Talkback will be forced to speak out that string instead of speaking out the localised string, rendering the app indiscernible.
In the below example, we have a TextView, whose text is hard coded.

```
<!--    //Hardcoded TextView-->
<com.google.android.material.textview.MaterialTextView
  android:id="@+id/heading"
  style="?attr/textAppearanceHeadline2"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  **android:text="Hello"
  **app:layout_constraintStart_toStartOf="parent"
  app:layout_constraintTop_toTopOf="parent" />
```

Since the text is hard coded, Talkback will fail to localize the string and will announce it as "Hello" in all locales.
https://drive.google.com/file/d/1c3xD7KqgnQDQ_S2eDYj2jjXIjW77u4dV/view?usp=sharing

To fix this, we need to remove the hard coded strings. For this we create two strings.xml files, one for default and one for french Locale.

```
<!--    Default string.xml file-->
<string name="greeting">Hello</string>

<!--    String.xml (fr) file -->
<string name="greeting">Bonjour</string>
```

Note: You can learn more about creating different Locale files [here](https://phrase.com/blog/posts/internationalizing-jetpack-compose-android-apps/#Adding_resources_for_other_languages).

Now in the textview, pass the reference to the above resource Id.

```
 <!--Dynamic TextView-->
 <com.google.android.material.textview.MaterialTextView
   android:id="@+id/heading"
   style="?attr/textAppearanceHeadline2"
   android:layout_width="match_parent"
   android:layout_height="wrap_content"
   **android:text="@string/greeting"
   app:layout_constraintStart_toStartOf="parent"
   app:layout_constraintTop_toTopOf="parent" />
```

Talkback will now announce the localized string.

When the phone language is set to french (any region), Talkback will use the string value corresponding to the french string resource file as seen in the video.
//23
https://drive.google.com/file/d/1ln8D5u2_sQ6V8-EwC-4MemZPuvvM9_BH/view?usp=sharing

For any other locale, Talkback will use the string from the default string.xml file
https://drive.google.com/file/d/1_VGgxXSZWWCenLofIxvgTmq0qlSBiYMl/view?usp=sharing

## Internationalising Numbers

Talkback speaks number with different units depending upon the Locale and formatting of the number. We need to make sure that the numbers are formatted correctly for Talkback service to read it accurately.
For example, let's say we want to set the number "200000" to a TextView.

- For English - US Locale, the number should be displayed as **"200,000"** and read by Talkback as **Two Hundred Thousand**
- For Hindi - India Locale, the number should be displayed as **"2,00,000"** and read by Talkback as **Two Lakhs**

To make sure the number is formatted and read correctly according to the Locale, we must use NumberFormat.

    //Incorrect way to set numbers
    binding.textviewUnformattedOne.text = "200,000"
    binding.textviewUnformattedTwo.text = "10,000,000"

    //Correct way to set numbers Using NumberFormat
    val numberFormat = NumberFormat.getInstance()
    binding.textviewFormattedOne.text = numberFormat.format(200000);
    binding.textviewFormattedTwo.text = numberFormat.format(10000000);

For a phone whose language is set to Hindi, the numbers are formatted and read correctly as you can see in the video below.
https://drive.google.com/file/d/1k1SrOe5Pp7cCC5TiUS7b0eTfNB3_nMWp/view?usp=sharing

## Internationalising Dates

Talkback also had the ability to announce dates according to the phone's Locale. However for this to happen, it is imperative that you not use hardcoded strings.
To take advantage of Talkback's localised dates we will use the
`DateTimeFormatter` class.

    val dateFormatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL)
    val dateOfBirth = LocalDate.of(1995, Month.OCTOBER, 7)
    val localizedDate = dateOfBirth.format(dateFormatter)
    binding.heading.text = localizedDate

When the phone's locale is set to en_US, the date is announced in English.
https://drive.google.com/file/d/18rXcRxtA85w5WOo33KatU_2Rd4CTtM4o/view?usp=sharing

And when the phone's locale is set to hi_IN, the same date is localised and announced in hindi, respecting the locale's date formatting and language.

https://drive.google.com/file/d/1E5qmMFZuUKUmjNAjuR3-XRIc9q-Gs-ID/view?usp=sharing

## Supporting Multiple Languages

You may come across a situation while developing an application where a part of the text in the app such as an address, a name etc is fixed and should be shown in a specific locale, irrespective of the phone's set locale.
The latest version of Talkback is able to switch languages on the fly.
In the example below, Talkback is able to identify the language of the text, English ("Hello") and Hindi("नमस्ते") and is able to announce the text accurately.
All you need to do is to define the fixed text in the default _strings.xml_ file.

        <!--    Default string.xml file-->

       <!-- Text to be always read in English-->
          <string name="greeting_fixed_in_English">Hello</string>
       <!-- Text to be always read in Hindi-->
         <string name="greeting_fixed_in_hindi">नमस्ते</string>

Note: It is important that you only define these strings in the default string.xml file and not in any other strings locale file as these strings are fixed and should be read as they are in any locale.

You can see in the video below how Talkback recognises different languages without explicitly defining them.
https://drive.google.com/file/d/14M9I6MtdU0V2ZmCOiVGoh4W3FgXJ4f3-/view?usp=sharing

## Content Descriptors

Android comes with certain accessibility APIs that help Talkback identify view elements and announce its description and type.
We will consider an example of ImageViews and a Button for this case.
//Insert 4
https://drive.google.com/file/d/118X89A8XtCcMsVyu7enYO4Ez5M5SKTCi/view?usp=sharing
We have two ImageViews, one for just decorative purpose and other depicting New York's Skyline and a Submit Button.

By default, Talkback will ignore the images and skip to the announce "Submit Button". However we want Talkback to also announce a description for the important image while ignoring the decorative one as it serves no value to a user who is visually disabled.

To solve this issue, make the following changes to the xml file-

    <!--    Setting content description to null for decorative image-->
    <ImageView
      android:id="@+id/decorativeImage"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:contentDescription="@null"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toTopOf="parent"
      app:srcCompat="@android:drawable/btn_star_big_on" />

    <!--Setting content description for important image-->
    <ImageView
      android:id="@+id/importantImage"
      style="?attr/textAppearanceHeadline6"
      android:layout_width="wrap_content"
      android:layout_height="400dp"
      android:contentDescription="@string/image_description"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toBottomOf="@+id/decorativeImage"
      app:srcCompat="@drawable/newyork" />

    <!--Setting content description for delete button-->
    <ImageButton
      android:id="@+id/textview_unformatted_one"
      android:layout_width="200dp"
      android:layout_height="wrap_content"
      android:contentDescription="@string/delete_button"
      android:padding="20dp"
      android:src="@android:drawable/ic_menu_delete"
      android:textColor="@color/white"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toBottomOf="@id/importantImage" />

Note: It is important that you set value of content descriptor as resource Id's of string rather than hard coded strings because Talkback will automatically pick up the localised string.
.
//5 - content
https://drive.google.com/file/d/1gCYIlb_XbV8O63NsjIZERFN4HtXKvdhM/view?usp=sharing

## Supporting RTL Layouts

Some languages like Urdu, Hebrew etc are read from Right-To-Left. Talkback can automatically detect these languages and announce the view elements from RTL instead of the normal LTR.

However, we need to make sure that the layout actually supports RTL or Talkback will fail. Currently the Textviews are **fixed** to the Left And Right of the parent view.

        <!--Key TextView-->
       <com.google.android.material.textview.MaterialTextView
          android:id="@+id/heading"
          style="?attr/textAppearanceHeadline6"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:nextFocusRight="@id/value"
          android:text="@string/water_intake_key"

          //Highlight below line
          app:layout_constraintLeft_toLeftOf="parent"
          app:layout_constraintTop_toTopOf="parent" />

        <!--    Value TextView-->
        <com.google.android.material.textview.MaterialTextView
          android:id="@+id/value"
          style="?attr/textAppearanceHeadline6"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@string/water_intake_value"

          //Highlight below line
          app:layout_constraintRight_toRightOf="parent"
          app:layout_constraintTop_toTopOf="parent" />

In English, Talkback will read it from left to right order in this sequence - "Water Intake" followed by "4 Litres".

However for any other language that uses RTL layout, Talkback will read it in incorrect order - "4 Litres" followed by "Water Intake" as can be seen in the video below -
https://drive.google.com/file/d/1RY-mNDCVvCJV09hnnyP0MLrPt6mje-JG/view?usp=sharing

To fix this make the following changes to the above code.

        <com.google.android.material.textview.MaterialTextView
          android:id="@+id/heading"
          style="?attr/textAppearanceHeadline6"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:nextFocusRight="@id/value"
         android:text="@string/water_intake_key"

          //Highlight below line
          app:layout_constraintStart_toStartOf="parent"
          app:layout_constraintTop_toTopOf="parent" />

       <com.google.android.material.textview.MaterialTextView
          android:id="@+id/value"
          style="?attr/textAppearanceHeadline6"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@string/water_intake_value"

          //Highlight below line
          app:layout_constraintEnd_toEndOf="parent"
          app:layout_constraintTop_toTopOf="parent" />

Now Talkback will announce the Text in correct order for all RTL layouts.
https://drive.google.com/file/d/1xkC6gqcBmeil3cl9elH7qNgAEcTvobIk/view?usp=sharing

Note: To test this, go to Settings > Developer Options and enable "Force RTL Layout", This will let you mirror any language to RTL layout to make it easier for testing.

In this blog, we learned to use Talkback service with internationalisation. This way it can be ensured that the application is accessible in all locales.
