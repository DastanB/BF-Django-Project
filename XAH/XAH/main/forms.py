from django import forms
from markdownx.fields import MarkdownxFormField

class PostForm(forms.Form):
    title = forms.CharField(max_length=255)
    photo = forms.ImageField()
    text = MarkdownxFormField()
    category = forms.IntegerField()