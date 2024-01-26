"""empty message

Revision ID: e6f1ac4a6153
Revises: 648259c30713
Create Date: 2024-01-25 17:39:15.214671

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e6f1ac4a6153'
down_revision = '648259c30713'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
        batch_op.drop_constraint('messages_event_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('messages_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_messages_event_id_events'), 'events', ['event_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(batch_op.f('fk_messages_user_id_users'), 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index('ix_posts_created')
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('public_profile', sa.BOOLEAN(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('public_profile')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_messages_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_messages_event_id_events'), type_='foreignkey')
        batch_op.create_foreign_key('messages_user_id_fkey', 'users', ['user_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.create_foreign_key('messages_event_id_fkey', 'events', ['event_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
        batch_op.alter_column('created_at',
               existing_type=sa.TIMESTAMP(),
               type_=postgresql.TIMESTAMP(timezone=True),
               existing_nullable=False,
               existing_server_default=sa.text('now()'))

    # ### end Alembic commands ###
